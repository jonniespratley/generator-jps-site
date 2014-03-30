#global describe, beforeEach, it 
'use strict'
path = require('path')
helpers = require('yeoman-generator').test
require('chai').should()

describe 'jps-site generator', ->
	
	#Mocked questions and answers
	mockAnswers = 
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
	

	#Before each test clean the test/temp folder and create a new generator.
	beforeEach (done) ->
		helpers.testDirectory path.join(__dirname, 'temp'), ((err) ->
			done(err)	if err
			@app = helpers.createGenerator('jps-site:app', ['../../app'])
			done()
		).bind(this)
	
	#First test if the files that were created match what we expect.
	it 'creates expected files', (done) ->
		
		#Add some mock prompts for the user to answer
		helpers.mockPrompt(@app, mockAnswers)
		
		#Skip installing of the bower and npm dependencies
		@app.options['skip-install'] = true
		
		#Run the app and test for files and file contents
		@app.run {}, ->
			
			#Assert files created match
			helpers.assertFile(mockFiles)
			
			
			#Assert file contents match
			helpers.assertFileContent 'app/index.html', ///
				<title>#{mockAnswers.siteTitle}<\/title> 							#index > title = Site title
			///
			helpers.assertFileContent 'app/index.html', ///
				<h1>#{mockAnswers.featureTitle}<\/h1> 								#index > .jumbotron h1
			///
			helpers.assertFileContent 'app/index.html', ///
				#{mockAnswers.featureBody} 														#index > .jumbotron p
			///
			
			
			done()
		
	
