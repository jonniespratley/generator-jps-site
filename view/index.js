'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ViewGenerator = yeoman.generators.NamedBase.extend({
	//Initialize + add new entry to config.
	init : function() {
		console.log('You called the view subgenerator with the argument ' + this.name + '.');
		
		//Update the html or lets append to the navbar-nav
		//domUpdate(html, tagName, content, mode)
		var tabHtml = '<li><a href="#/"'+this.name+'">' + this.name + '</a></li>';
		
		this.domUpdate(tabHtml, '.navbar-nav', this.name, 'a');
		
	},
	//Copy any files
	files : function() {
		console.log('Files method called');
		this.mkdir('app/scripts/controllers');
	},
	//Create and copy the js file
	viewJs : function() {
		this.copy('_view.js', 'app/scripts/controllers/' + this.name + '.js');
	},
	//Create and copy the html file.
	viewHtml : function() {

		this.copy('_view.html', 'app/views/' + this.name + '.html');
	}
});

module.exports = ViewGenerator;
