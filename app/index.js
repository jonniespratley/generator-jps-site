'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var JpsSiteGenerator;

module.exports = JpsSiteGenerator = yeoman.generators.Base.extend();

/**
 *   init - This method initializes the generator by loading the package.json file
 *   and adding an event listener to the 'end' event of the generator.
 */
JpsSiteGenerator.prototype.init = function() {
  this.on('end', function() {
    if (this.options['skip-install'] !== true) {
      this.installDependencies();
    }
  });
  this.pkg = require('../package.json');
};

/**
 *askFor - Prompt the user for questions related to the project generating.
 */
JpsSiteGenerator.prototype.askFor = function() {
  var done;
  done = this.async();
  this.log(this.yeoman);
  this.log(chalk.yellow('You are using the JPS Site Yeoman generator.'));
  this.prompts = [
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
  this.prompt(this.prompts, (function(props) {
    this.siteTitle = props.siteTitle;
    this.siteDesc = props.siteDesc;
    this.featureTitle = props.featureTitle;
    this.featureBody = props.featureBody;
    this.featureImage = props.featureImage;
    done();
  }).bind(this));
};

/**
 *config - Set the prompt answers in the config.json file
 */
JpsSiteGenerator.prototype.config = function() {
  this.config.set('sitetitle', this.siteTitle);
  this.config.set('feature.title', this.featureTitle);
  this.config.set('version', this.pkg.version);
};

/**
 *appFolders - Create all of the application specific folders.
 */
JpsSiteGenerator.prototype.appFolders = function() {
  this.mkdir('app');
  this.mkdir('app/images');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/pages');
};

/**
 *appFiles - Copy all of the application specific files.
 */
JpsSiteGenerator.prototype.appFiles = function() {
  this.copy('feature.png', 'app/images/feature.png');
  this.copy('_index.html', 'app/index.html');
  this.copy('_main.html', 'app/pages/main.html');
  this.copy('_config.js', 'app/scripts/config.js');
  this.copy('_main.js', 'app/scripts/main.js');
  this.copy('_main.css', 'app/styles/main.css');
};

/**
 *projectFiles - Copy all of the project specific files.
 */
JpsSiteGenerator.prototype.projectfiles = function() {
  this.copy('_package.json', 'package.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
};

/**
 *bowerFiles - Copy all of the bower specific files.
 */
JpsSiteGenerator.prototype.bowerFiles = function() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

/**
 *editorFiles - Copy all files that handle code editing.
 */
JpsSiteGenerator.prototype.editorFiles = function() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

/**
  gitFiles - Copy all files that handle git repositorys
 */
JpsSiteGenerator.prototype.gitFiles = function() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

/**
 *travisFiles - Copy files for Travis CI.
 */
JpsSiteGenerator.prototype.travisFiles = function() {
  this.copy('travis.yml', '.travis.yml');
};

/**
 *bowerInstaller - Execute the bower install with predefined libaries and save to the bower.json file.
 */
JpsSiteGenerator.prototype.bowerInstaller = function() {
  if (this.options['skip-install'] !== true) {
    this.bowerInstall(['jquery', 'handlebars', 'bootstrap'], {
      save: true
    });
  }
};