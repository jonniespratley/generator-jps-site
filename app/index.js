(function() {
  'use strict';
  var JpsSiteGenerator, chalk, path, util, yeoman;

  util = require('util');

  path = require('path');

  yeoman = require('yeoman-generator');

  chalk = require('chalk');

  module.exports = JpsSiteGenerator = yeoman.generators.Base.extend();

  JpsSiteGenerator.prototype.init = function() {
    this.on('end', function() {
      if (!this.options['skip-install']) {
        return this.installDependencies();
      }
    });
    return this.pkg = require('../package.json');
  };

  JpsSiteGenerator.prototype.askFor = function() {
    var done, prompts;
    done = this.async();
    this.log(this.yeoman);
    this.log(chalk.yellow('You are using the JS Blog Yeoman generator.'));
    prompts = [
      {
        type: 'input',
        name: 'blogName',
        message: 'What is the name of your blog?',
        "default": 'My Blog'
      }, {
        type: 'input',
        name: 'featureTitle',
        message: 'What is the feature?',
        "default": 'Modern Blog'
      }, {
        type: 'input',
        name: 'featureDesc',
        message: 'The feature description?',
        "default": 'A modern blog using modern tools & technologies.'
      }, {
        type: 'input',
        name: 'featureImg',
        message: 'The feature image?',
        "default": 'images/feature.png'
      }
    ];
    return this.prompt(prompts, (function(props) {
      this.blogName = props.blogName;
      this.featureTitle = props.featureTitle;
      this.featureDesc = props.featureDesc;
      this.featureImg = props.featureImg;
      return done();
    }).bind(this));
  };

  JpsSiteGenerator.prototype.appFolders = function() {
    this.mkdir('app');
    this.mkdir('app/images');
    this.mkdir('app/scripts');
    return this.mkdir('app/styles');
  };

  JpsSiteGenerator.prototype.appFiles = function() {
    this.copy('feature.png', 'app/images/feature.png');
    this.template('_index.html', 'app/index.html');
    this.template('_main.js', 'app/scripts/main.js');
    return this.template('_main.css', 'app/styles/main.css');
  };

  JpsSiteGenerator.prototype.projectfiles = function() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
    return this.template('_Gruntfile.js', 'Gruntfile.js');
  };

  JpsSiteGenerator.prototype.bowerFiles = function() {
    this.template('_bower.json', 'bower.json');
    return this.copy('bowerrc', '.bowerrc');
  };

  JpsSiteGenerator.prototype.bowerInstaller = function() {
    return this.bowerInstall(['jquery', 'bootstrap'], {
      save: true
    });
  };

}).call(this);
