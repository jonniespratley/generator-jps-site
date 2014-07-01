
'use strict'
util = require('util')
yeoman = require('yeoman-generator')

module.exports = PageGenerator = yeoman.generators.NamedBase.extend()


PageGenerator.description = 'This is a page generator'



###*
Initialize sub-generator
###
PageGenerator::init = ->
	if @name
		console.log "You called the page sub-generator with the argument " + @name + "."
	else
		throw new Error('You must provide a page name!')
		return

###*
	Write the template to the projects app/pages directory file
###
PageGenerator::files = ->
	@copy '_page.html', "app/pages/#{@name}.html"

###*
	Handle appending the page link to the index.html pages .nav element
###
PageGenerator::appendLink = ->
	htmlLink = """
	<li>
		<a href="#/#{@name}">
			#{@name}
		</a>
	</li>
	"""

	#Append link to page to .nav
	@appendToFile('app/index.html', 'ul.nav', htmlLink)