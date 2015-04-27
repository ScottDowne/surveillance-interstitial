var express = require('express'),
    Habitat = require('habitat');

Habitat.load();

var app = express(),
  env = new Habitat();

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

app.listen(env.get('PORT'), function () {
  console.log('Server listening ( http://localhost:%d )', env.get('PORT'));
});
