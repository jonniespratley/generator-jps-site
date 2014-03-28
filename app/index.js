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
    this.log(chalk.yellow('You are using the JPS Site Yeoman generator.'));
    prompts = [
      {
        type: 'input',
        name: 'siteTitle',
        message: 'What is the name of your site',
        "default": 'My Site'
      }, {
        type: 'input',
        name: 'siteDesc',
        message: 'What is the site description?',
        "default": 'A modern site built with a Yeoman Generator.'
      }, {
        type: 'input',
        name: 'featureTitle',
        message: 'What is the feature?',
        "default": 'Modern Site'
      }, {
        type: 'input',
        name: 'featureBody',
        message: 'The feature description?',
        "default": 'A modern site using modern tools & technologies.'
      }, {
        type: 'input',
        name: 'featureImage',
        message: 'The feature image?',
        "default": 'images/feature.png'
      }
    ];
    return this.prompt(prompts, (function(props) {
      this.siteTitle = props.siteTitle;
      this.siteDesc = props.siteDesc;
      this.featureTitle = props.featureTitle;
      this.featureBody = props.featureBody;
      this.featureImage = props.featureImage;
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
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
    return this.template('_Gruntfile.js', 'Gruntfile.js');
  };

  JpsSiteGenerator.prototype.bowerFiles = function() {
    this.copy('bowerrc', '.bowerrc');
    return this.template('_bower.json', 'bower.json');
  };

  JpsSiteGenerator.prototype.editorFiles = function() {
    this.copy('editorconfig', '.editorconfig');
    return this.copy('jshintrc', '.jshintrc');
  };

  JpsSiteGenerator.prototype.gitFiles = function() {
    this.copy('gitignore', '.gitignore');
    return this.copy('gitattributes', '.gitattributes');
  };

  JpsSiteGenerator.prototype.travisFiles = function() {
    return this.copy('travis.yml', '.travis.yml');
  };

  JpsSiteGenerator.prototype.bowerInstaller = function() {
    return this.bowerInstall(['jquery', 'bootstrap'], {
      save: true
    });
  };

}).call(this);
