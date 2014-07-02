"use strict";
var util = require('util'), yeoman = require('yeoman-generator');

//PageSubGenerator - handles creating a new page and appending a link.
var PageSubGenerator = yeoman.generators.NamedBase.extend({

	//init - Initialize sub-generator
	init: function () {
		if (this.name) {
			return console.log('You called the page sub-generator with the argument' + this.name + '.');
		} else {
			throw new Error('You must provide a page name!');
		}
	},

	//files - Write the template to the projects app/pages directory file
	files: function () {
		return this.copy('_page.html', 'app/pages/' + this.name + '.html');
	},

	//appendLink - Handle appending the page link to the index.html pages .nav element
	appendLink: function () {
		var htmlLink;
		htmlLink = '<li><a href="#/" + this.name + ">' + this.name + '</a></li>';
		return this.appendToFile('app/index.html', 'ul.nav', htmlLink);
	}
});
module.exports = PageSubGenerator;
