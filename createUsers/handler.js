const aws = require("aws-sdk");
const { randomUUID } = require("crypto")

let dynamoDBClientParams = {};

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    };
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

const createUsers = async (event, context) => {

    const id = randomUUID();

    let userBody = JSON.parse(event.body);

    userBody.pk = id;

    const params = {
        TableName: 'usersTable',
        Item: userBody
    };

    console.log(params.Item)

    return dynamodb.put(params).promise().then(res => {
        console.log(res);
        return {
            "statusCode": 201,
            "body": JSON.stringify(params.Item)
        }
    })
}

module.exports = {
    createUsers
}
