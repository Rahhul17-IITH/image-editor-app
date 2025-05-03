const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE = process.env.DYNAMODB_TABLE;

exports.saveImageMeta = (userId, imageId, s3Key, labels = [], detectedText = []) =>
  dynamo
    .put({
      TableName: TABLE,
      Item: { userId, imageId, s3Key, labels, detectedText, createdAt: Date.now() },
    })
    .promise();

exports.listImages = (userId) =>
  dynamo
    .query({
      TableName: TABLE,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId },
    })
    .promise()
    .then((res) => res.Items);

exports.deleteImageMeta = (userId, imageId) =>
  dynamo
    .delete({
      TableName: TABLE,
      Key: { userId, imageId },
    })
    .promise();


