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

  return {
    statusCode: 200,
    headers: {
      'content-type': 'image/png'
    },
    body: JSON.stringify(decoded),
  }
}