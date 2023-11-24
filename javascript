const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { option } = JSON.parse(event.body);

    const params = {
        TableName: 'Votes',
        Key: { 'Option': option },
        UpdateExpression: 'ADD #count :val',
        ExpressionAttributeNames: { '#count': 'Count' },
        ExpressionAttributeValues: { ':val': 1 },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const data = await dynamoDB.update(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Attributes)
        };
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        };
    }
};
