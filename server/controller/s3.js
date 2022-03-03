const aws = require('aws-sdk');
require("dotenv").config();
const crypto = require('crypto');
const promisify = require('util').promisify;

const randomBytes = promisify(crypto.randomBytes);
const region = 'ap-northeast-2';
const bucketName = 'donorticon.shop/img';
const accessKeyId = process.env.BUCKET_ACCESS_KEY_ID;
const secretAccessKey = process.env.BUCKET_ACCESS_KEY_SECRET;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

module.exports = async () => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = ({
    Bucket: bucketName, 
    Key: imageName,
    Expires: 60
  })

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL
}