module.exports = (grunt) ->
	'use strict'
	
	# load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks') grunt
	
	# require it at the top and pass in the grunt instance
	require('time-grunt') grunt
	
	# Project configuration
	grunt.initConfig
		
		# Task configuration
		jshint:
			options:
				jshintrc: true
				node: true
				curly: true
				eqeqeq: true
				immed: true
				latedef: true
				newcap: true
				noarg: true
				sub: true
				undef: true
				unused: true
				boss: true
				eqnull: true
				globals:
					jQuery: true

			gruntfile:
				src: 'Gruntfile.js'

			project:
				src: [
					'app/*.js'
					'test/**/*.js'
				]

		nodeunit:
			files: ['test/**/*.js']

		coffee:
			compile:
				expand: true
				bare: true
				flatten: true
				cwd: './src'
				src: ['*.coffee']
				dest: './app'
				ext: '.js'

		watch:
			compile:
				files: 'src/*.coffee'
				tasks: ['coffee:compile']

	
	# Default task
	grunt.registerTask 'default', [
		'coffee'
		#'jshint'
		#'nodeunit'
	]
	return
