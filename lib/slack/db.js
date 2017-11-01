const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.storeSlackToken = function (user_id, token) {
    const putSlackTokenParams = {
        TableName: 'SlackToken',
        Item: {
            user_id,
            token
        }
    };

    return dynamoDb.put(putSlackTokenParams).promise();
}

exports.getSlackToken = function (user_id) {
    const getSlackTokenParams = {
        TableName: 'SlackToken',
        ConsistentRead: true,
        KeyConditionExpression: 'user_id = :x',
        ExpressionAttributeValues: {
            ':x': user_id
        }
    }

    return dynamoDb.query(getSlackTokenParams).promise()
        .then((data) => data.Items[0].token);
}
