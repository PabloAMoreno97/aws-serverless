const aws = require("aws-sdk");

let dynamoDBClientParams = {};

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    };
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

const updateUsers = async (event, context) => {

    let userId = event.pathParameters.id;
    const userBody = JSON.parse(event.body);
    
    const params = {
        TableName: 'usersTable',
        Key: {pk: userId},
        UpdateExpression: 'set #name = :name',
        ExpressionAttributeNames:{'#name': 'name'},
        ExpressionAttributeValues: { ':name': userBody.name },
        ReturnValues: 'ALL_NEW'
    };

    return dynamodb.update(params).promise().then(res => {
        console.log(res);
        return {
            "statusCode": 200,
            "body": JSON.stringify(res.Attributes)
        }
    })
}

module.exports = {
    updateUsers
}
