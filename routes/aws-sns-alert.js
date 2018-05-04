'use strict';
const express = require('express');
const router = express.Router();
const snsPublish = require('aws-sns-publish');
const AWS = require('aws-sdk');

/* send SNS alert */
router.post('/', function(req, res, next) {
  snsPublish(req.body, {arn: 'arn:aws:sns:us-west-2:111122223333:MyTopic', region: 'us-west-2' })
  .then( messageId => {
    console.log("SNS publish data: " + messageId);
    return res.json(messageId);
  })
  .catch( (err) => {
    console.log("SNS publish error: " + err );
    return res.json("SNS publish mock messageId: 123456");
    // return next(err);
  });
});
module.exports = router;