(function() {
  'use strict';
  var ViewGenerator, util, yeoman;

  util = require('util');

  yeoman = require('yeoman-generator');

  ViewGenerator = yeoman.generators.NamedBase.extend({
    init: function() {
      return console.log("You called the page subgenerator with the argument " + this.name + ".");
    },
    files: function() {
      return this.copy('_view.html', "app/views/" + this.name);
    }
  });

  module.exports = ViewGenerator;

}).call(this);
