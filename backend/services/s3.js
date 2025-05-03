const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET = process.env.S3_BUCKET;

exports.uploadToS3 = (key, buffer, mimetype) =>
  s3
    .putObject({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

exports.getS3Url = (key) =>
  `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

// ---- ADD THIS FUNCTION ----
exports.deleteFromS3 = (key) =>
  s3
    .deleteObject({
      Bucket: BUCKET,
      Key: key,
    })
    .promise();


