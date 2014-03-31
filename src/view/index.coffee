'use strict'
util = require('util')
yeoman = require('yeoman-generator')


ViewGenerator = yeoman.generators.NamedBase.extend(
	init: ->
		console.log "You called the page subgenerator with the argument " + @name + "."
	
	files: ->
		@copy '_view.html', "app/views/#{@name}"
	
)

module.exports = ViewGenerator