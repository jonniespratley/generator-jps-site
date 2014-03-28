'use strict'
util = require('util')
path = require('path')
yeoman = require('yeoman-generator')
chalk = require('chalk')

# jps-site-generator - This is an example generator.
module.exports = JpsSiteGenerator = yeoman.generators.Base.extend()

#	 init - This method initializes the generator by loading the package.json file
#	 and adding an event listener to the 'end' event of the generator.	 
JpsSiteGenerator::init = ->
	@on 'end', ->
		@installDependencies()	unless @options['skip-install']
	@pkg = require('../package.json')


#askFor - Prompt the user for questions related to the project generating.
JpsSiteGenerator::askFor = ->
	done = @async()
	@log @yeoman
	@log chalk.yellow('You are using the JPS Site Yeoman generator.')
	
	prompts = [
			type: 'input'
			name: 'siteTitle'
			message: 'What is the name of your site'
			default: 'My Site'
		,
			type: 'input'
			name: 'siteDesc'
			message: 'What is the site description?'
			default: 'A modern site built with a Yeoman Generator.'
		,
			type: 'input'
			name: 'featureTitle'
			message: 'What is the feature?'
			default: 'Modern Site'
		,
			type: 'input'
			name: 'featureBody'
			message: 'The feature description?'
			default: 'A modern site using modern tools & technologies.'
		,
			type: 'input'
			name: 'featureImage'
			message: 'The feature image?'
			default: 'images/feature.png'
	]
	@prompt prompts, ((props) ->
			@siteTitle = props.siteTitle
			@siteDesc = props.siteDesc
			
			@featureTitle = props.featureTitle
			@featureBody = props.featureBody
			@featureImage = props.featureImage
			done()
		).bind(this)


#appFolders - Create all of the application specific folders.
JpsSiteGenerator::appFolders = ->
	@mkdir 'app'
	@mkdir 'app/images'
	@mkdir 'app/scripts'
	@mkdir 'app/styles'
	
#appFiles - Copy all of the application specific files.
JpsSiteGenerator::appFiles = ->
	@copy 'feature.png', 'app/images/feature.png'
	@template '_index.html', 'app/index.html'
	@template '_main.js', 'app/scripts/main.js'
	@template '_main.css', 'app/styles/main.css'

#projectFiles - Copy all of the project specific files.
JpsSiteGenerator::projectfiles = ->
	@template '_config.json', 'config.json'
	@template '_package.json', 'package.json'
	@template '_Gruntfile.js', 'Gruntfile.js'

#bowerFiles - Copy all of the bower specific files.
JpsSiteGenerator::bowerFiles = ->
	@copy 'bowerrc', '.bowerrc'
	@template '_bower.json', 'bower.json'

#editorFiles - Copy all files that handle code editing.
JpsSiteGenerator::editorFiles = ->
	@copy 'editorconfig', '.editorconfig'
	@copy 'jshintrc', '.jshintrc'

JpsSiteGenerator::gitFiles = ->
	@copy 'gitignore', '.gitignore'
	@copy 'gitattributes', '.gitattributes'
	
#travisFiles - Copy files for Travis CI.
JpsSiteGenerator::travisFiles = ->
	@copy 'travis.yml', '.travis.yml'

#bowerInstaller - Execute the bower install with predefined libaries and save to the bower.json file.
JpsSiteGenerator::bowerInstaller = ->
	@bowerInstall([ 'jquery', 'bootstrap' ], save: true)


