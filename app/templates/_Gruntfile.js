// Generated on <%= (new Date).toISOString() %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var HOST = 'localhost';
var PORT = 9000;
var LIVERELOAD_PORT = 35729;

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	//Project tasks
	grunt.initConfig({

		//watch - This task will watch files and run tasks when files change.
		watch: {
			options: {
				nospawn: true,
				livereload: true
			},
			//Watch for index file changes and build
			livereload: {
				files: ['app/index.html', 'app/scripts/**/*.js', 'app/styles/*.css'],
				tasks: ['build']
			},
			//Watch any bower changes and inject scripts.
			bower: {
				files: ['bower.json'],
				tasks: ['bowerInstall']
			},
		},

		//Server - The actual grunt server settings
		connect: {
			options: {
				port: PORT,
				livereload: LIVERELOAD_PORT,
				hostname: HOST
			},
			livereload: {
				options: {
					open: true,
					base: ['.tmp', 'app']
				}
			}
		},

		//JSHint - Handle linting all source files
		jshint:{
			target:{
				jshintrc: true,
				src: [
					'app/scripts/**/*.js'
				]
			}
		},

		//bowerInstall - This installs bower_component packages into specified files.
		bowerInstall: {
			target: {
				src: ['app/**/*.html'],
				dependencies: true,
				devDependencies: false
			}
		}
	});

	//Server
	grunt.registerTask('serve', function(target) {
		console.log('running serve');
		grunt.task.run(['bowerInstall', 'build', 'connect:livereload', 'watch']);
	});

	//Build
	grunt.registerTask('build', 'Building the project.', function() {
		console.log('running build');
		grunt.task.run(['jshint']);
	});

	//Default
	grunt.registerTask('default', ['build', 'serve']);

};
