/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();
app.import('bower_components/bootstrap/dist/css/bootstrap.css');

module.exports = app.toTree();
