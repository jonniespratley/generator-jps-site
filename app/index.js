'use strict';
var util = require( 'util' );
var path = require( 'path' );
var yeoman = require( 'yeoman-generator' );
var yosay = require( 'yosay' );

var JpsSiteGenerator = yeoman.generators.Base.extend();

/**
 *   init - This method initializes the generator by loading the package.json file
 *   and adding an event listener to the 'end' event of the generator.
 */
JpsSiteGenerator.prototype.init = function () {
	this.on( 'end', function () {
		if (this.options['skip-install'] !== true) {
			this.installDependencies();
		}
	} );
	this.pkg = require( '../package.json' );
};

/**
 *askFor - Prompt the user for questions related to the project generating.
 */
JpsSiteGenerator.prototype.askFor = function () {
	var done;
	done = this.async();
	this.log( this.yeoman );
	this.log( yosay( 'You are using JPS Site Yeoman generator.' ) );
	this.prompts = [
		{
			type: 'input',
			name: 'siteTitle',
			message: 'What is the name of your site',
			"default": 'My Site'
		},
		{
			type: 'input',
			name: 'siteDesc',
			message: 'What is the site description?',
			"default": 'A modern site built with a Yeoman Generator.'
		},
		{
			type: 'input',
			name: 'featureTitle',
			message: 'What is the feature?',
			"default": 'Modern Site'
		},
		{
			type: 'input',
			name: 'featureBody',
			message: 'The feature description?',
			"default": 'A modern site using modern tools & technologies.'
		},
		{
			type: 'input',
			name: 'featureImage',
			message: 'The feature image?',
			"default": 'images/feature.png'
		}
	];
	this.prompt( this.prompts, (function (props) {
		this.siteTitle = props.siteTitle;
		this.siteDesc = props.siteDesc;
		this.featureTitle = props.featureTitle;
		this.featureBody = props.featureBody;
		this.featureImage = props.featureImage;
		done();
	}).bind( this ) );
};

/**
 *config - Set the prompt answers in the config.json file
 */
JpsSiteGenerator.prototype.config = function () {
	this.config.set( 'sitetitle', this.siteTitle );
	this.config.set( 'feature.title', this.featureTitle );
	this.config.set( 'version', this.pkg.version );
};

/**
 *projectFiles - Copy all of the project specific files.
 */
JpsSiteGenerator.prototype.projectfiles = function () {

	//Copy package and Grunt files
	this.copy( '_package.json', 'package.json' );
	this.copy( '_Gruntfile.js', 'Gruntfile.js' );

	//Copy all of the bower specific files.
	this.copy( 'bowerrc', '.bowerrc' );
	this.copy( '_bower.json', 'bower.json' );

	//Copy all files that handle code editing.
	this.copy( 'editorconfig', '.editorconfig' );
	this.copy( 'jshintrc', '.jshintrc' );

	//Copy all files that handle git repositorys
	this.copy( 'gitignore', '.gitignore' );
	this.copy( 'gitattributes', '.gitattributes' );

	//Copy files for Travis CI.
	this.copy( 'travis.yml', '.travis.yml' );
};

/**
 *appFolders - Create all of the application specific folders.
 */
JpsSiteGenerator.prototype.appFolders = function () {
	this.mkdir( 'app' );
	this.mkdir( 'app/images' );
	this.mkdir( 'app/scripts' );
	this.mkdir( 'app/styles' );
	this.mkdir( 'app/pages' );
};

/**
 *appFiles - Copy all of the application specific files.
 */
JpsSiteGenerator.prototype.appFiles = function () {
	this.copy( 'feature.png', 'app/images/feature.png' );
	this.copy( '_index.html', 'app/index.html' );
	this.copy( '_main.html', 'app/pages/main.html' );
	this.copy( '_config.js', 'app/scripts/config.js' );
	this.copy( '_main.js', 'app/scripts/main.js' );
	this.copy( '_main.css', 'app/styles/main.css' );
};

/**
 *bowerInstaller - Execute the bower install with predefined libaries and save to the bower.json file.
 */
JpsSiteGenerator.prototype.bowerInstaller = function () {
	if (this.options['skip-install'] !== true) {
		this.bowerInstall( ['jquery', 'handlebars', 'bootstrap'], {
			save: true
		} );
	}
};

module.exports = JpsSiteGenerator;
