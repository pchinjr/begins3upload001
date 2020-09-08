// learn more about HTTP functions here: https://arc.codes/primitives/http

let arc = require('@architect/functions')
let aws = require('aws-sdk')
const fs = require('fs')

exports.handler = async function http(req) {

  let body = req.body //base64 encoded string
  let buff = Buffer.from(body, 'utf8') //buffer that converts to string
  let b64 = buff.toString('base64') // still the wrong one - needs to be decoded again
  let secondBuff = Buffer.from(b64, 'base64')
  let decoded = secondBuff.toString('utf8') //still not decoded

  return {
    statusCode: 200,
    headers: {
      'content-type': 'image/jpeg'
    },
    body: decoded,
  }
}