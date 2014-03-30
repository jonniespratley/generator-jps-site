#global describe, beforeEach, it 
'use strict'
path = require('path')
helpers = require('yeoman-generator').test
require('chai').should()

describe 'jps-site generator', ->
	
	#Mocked questions and answers
	mockQa = 
		siteTitle: 'My Test Site'
		siteDesc: 'A modern site build to test.'
		featureTitle: 'Mocha Tests'
		featureBody: 'A modern site created by a Yeoman generator.'
		featureImage: 'images/feature.png'
		
	mockFiles = [
		'.bowerrc'
		'.editorconfig'
		'.gitattributes'
		'.gitignore'
		'.jshintrc'
		'.travis.yml'
		'bower.json'
		'config.json'
		'Gruntfile.js'
		'package.json'
		
		#Check app files
		'app/images/feature.png'
		'app/scripts/main.js'
		'app/styles/main.css'
		'app/index.html'
		
		#Add other files to check for here...
		]
	
	
	
	
	beforeEach (done) ->
		helpers.testDirectory path.join(__dirname, 'temp'), ((err) ->
			return done(err)	if err
			@app = helpers.createGenerator('jps-site:app', ['../../app'])
			done()
		).bind(this)
	
	#First test if the files that were created match what we expect.
	it 'creates expected files', (done) ->
		
		#Add some mock prompts for the user to answer
		helpers.mockPrompt(@app, mockQa)

		#Skip installing of the bower and npm dependencies
		@app.options['skip-install'] = true
		

		#Run the app and test for files.
		@app.run {}, ->
			helpers.assertFile(mockFiles)
			done()
		
	#Test the contents of the generated files
	it 'should have created the correct index.html file', (done) ->
		
		#header h3
		
		#.jumbotron h1
		
		#.jumbotron p
		
		
		#Main.css
		
		#Main.js
		
		#Images/feature.png
		
		#Bower components
