'use strict'
module.exports = (grunt) ->
	require('load-grunt-tasks') grunt
	require('time-grunt') grunt
	
	# Project configuration
	grunt.initConfig
		coffee:
			compile:
					expand: true
					bare: true
					cwd: './src'
					src: ['**/*.coffee']
					dest: './'
					ext: '.js'
		
		clean:
			test: ['test/temp']
			
		watch:
			compile:
				files: ['src/**/*.coffee']
				tasks: [
					'coffee'
					'mochaTest'
				]
		
		mochaTest:
			test: 
				options: 
					reporter: 'spec'
				src: [
					'test/**/test-*.js'
				]
	
	# Default task
	grunt.registerTask 'default', [
		'clean'
		'coffee'
		'mochaTest'
		'clean'
	]
