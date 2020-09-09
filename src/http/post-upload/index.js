// learn more about HTTP functions here: https://arc.codes/primitives/http

const path = require('path')
const fs = require('fs')
const aws = require('aws-sdk')
exports.handler = async function http(req) {

  let body = req.body //base64 encoded string
  let buff = Buffer.from(body) //buffer that converts to string
  let b64 = buff.toString('base64') // still the wrong one - needs to be decoded again
  let secondBuff = Buffer.from(b64, 'base64')
  let decoded = secondBuff.toString('utf8') //still not decoded

  if (process.env.NODE_ENV === 'testing') {
    let pathToPublic = path.join(__dirname, '..', '..', '..', 'public', 'image.jpg')
    fs.writeFileSync(pathToPublic, decoded)
  }
  else {
    // write to s3
    let s3 = new aws.S3
    await s3.putObject({
      ACL: 'public-read',
      Bucket: process.env.ARC_STATIC_BUCKET,
      Key: `${process.env.ARC_STATIC_FOLDER}/image.jpg`,
      Body: decoded,
      ContentType: `image/jpeg`,
      CacheControl: 'max-age=315360000',
    })
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'image/jpeg'
    },
    body: JSON.stringify(decoded),
  }
}