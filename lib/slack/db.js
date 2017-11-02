const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.storeSlackToken = function (channel_id, bot_user_id, token) {
    const putSlackTokenParams = {
        TableName: 'SlackToken',
        Item: {
            channel_id,
            bot_user_id,
            token
        }
    };

    return dynamoDb.put(putSlackTokenParams).promise();
}

exports.getSlackToken = function (channel_id) {
    const getSlackTokenParams = {
        TableName: 'SlackToken',
        ConsistentRead: true,
        KeyConditionExpression: 'channel_id = :x',
        ExpressionAttributeValues: {
            ':x': channel_id
        }
    }

    return dynamoDb.query(getSlackTokenParams).promise()
        .then((data) => data.Items[0].token);
}

exports.revokeSlackToken = function (bot_user_id) {
    const queryParams = {
        TableName: 'SlackToken',
        IndexName: 'ByBotUserId',
        KeyConditionExpression: 'bot_user_id = :x',
        ExpressionAttributeValues: {
            ':x': bot_user_id
        }
    }

    const deleteParams = (channel_id) => ({
        TableName: 'SlackToken',
        Key: {
            channel_id
        }
    })

    return dynamoDb.query(queryParams).promise()
        .then(data => data.Items[0].channel_id)
        .then(channel_id => dynamoDb.delete(deleteParams(channel_id)).promise());
}
