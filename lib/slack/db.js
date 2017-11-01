const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.storeSlackToken = function (channel_id, token) {
    const putSlackTokenParams = {
        TableName: 'SlackToken',
        Item: {
            channel_id,
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
