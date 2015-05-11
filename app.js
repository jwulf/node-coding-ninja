#! /usr/bin/env node

var program = require('commander');

program
 .version('0.0.5')
 .option('-n, --ninja-file [uid]', 'Ninja file UID')
 .parse(process.argv);

if (program.ninjaFile) {

  var express = require('express');
  var app = express();
  var request = require('request');
  var srcUrl = 'http://node-coding-ninja.s3-website-ap-southeast-2.amazonaws.com/'
                + program.ninjaFile;

  app.get('*',function(req,res){
    request(srcUrl + req.url).pipe(res);
  });

  // https://github.com/joyent/node/issues/9195
// https://github.com/strongloop/express/pull/2342#issuecomment-54517525
  var server = app.listen(3000, '127.0.0.1', function () {

    var host = server.address().address;
    var port = server.address().port;


    console.log('Ninja Dojo initialized.');

    console.log('Open http://%s:%s in your browser', host, port);

  });
}
