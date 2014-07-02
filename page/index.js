'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var PageSubGenerator = yeoman.generators.NamedBase.extend({
	//Initialize sub-generator
	init: function () {
		if (this.name) {
			return console.log("You called the page sub-generator with the argument " + this.name + ".");
		} else {
			throw new Error('You must provide a page name!');
		}
	},
	// Write the template to the projects app/pages directory file
	files: function () {
		return this.copy('_page.html', "app/pages/" + this.name + ".html");
	},
	//Handle appending the page link to the index.html pages .nav element
	appendLink: function () {
		var htmlLink;
		htmlLink = "<li>\n	<a href=\"#/" + this.name + "\">\n		" + this.name + "\n	</a>\n</li>";
		return this.appendToFile('app/index.html', 'ul.nav', htmlLink);
	}
});
module.exports = PageSubGenerator;
