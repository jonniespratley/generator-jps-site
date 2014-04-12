'use strict'
util = require('util')
yeoman = require('yeoman-generator')

module.exports = PageGenerator = yeoman.generators.NamedBase.extend()

#Initialize sub-generator
PageGenerator::init =  ->
	console.log "You called the page sub-generator with the argument " + @name + "."

#Write the file
PageGenerator::files = ->
	@copy '_page.html', "app/pages/#{@name}.html"


#Handle appending the link
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

