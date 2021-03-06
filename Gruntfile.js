'use strict';
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		clean: {
			test: ['test/temp']
		},
		watch: {
			compile: {
				files: ['app/*.js', 'page/*.js', 'test/*.js'],
				tasks: ['jshint', 'mochaTest']
			}
		},
		jshint:{
			target:{
				jshintrc: true,
				src: ['app/*.js', 'page/*.js', 'test/*.js']
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/**/test-*.js']
			}
		}
	});
	grunt.registerTask('default', ['clean', 'jshint', 'mochaTest']);
	grunt.registerTask('test', ['default']);
};
