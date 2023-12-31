const aws = require("aws-sdk");

let dynamoDBClientParams = {};

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    };
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

const getUsers = async (event, context) => {

    let userId = event.pathParameters.id;

    const params = {
        ExpressionAttributeValues: { ':pk': userId },
        KeyConditionExpression: 'pk = :pk',
        TableName: 'usersTable'
    };

    return dynamodb.query(params).promise().then(res => {
        console.log(res);
        return {
            "statusCode": 200,
            "body": JSON.stringify(res.Items[0])
        }
    })
}

module.exports = {
    getUsers
}
