(function() {
  'use strict';
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var request = require('request');
  var path = require('path');
  var api = 'http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words';
  var _ = require('underscore');


  // Connect routes to the application
  // Configure app to use bodyParser()
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, './')));
  app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


  app.get('/', function(req,res){
    console.log('hey')
    // request({
    //   uri: api
    // }).on('error', function(err){
    //   console.log(err);
    // }).pipe(res);
  })























  //Set the port
  var port = process.env.PORT || 3000;

  //all of the routes will be prefixed with the api
  app.listen(port);
}());
