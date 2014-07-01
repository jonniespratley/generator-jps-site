/* Script for <%= _.slugify(siteTitle) %> */
var App = {
	name: '<%= _.slugify(siteTitle) %>',
	config: null,
	Models: {},
	Controllers: {},
	Views: {},
	/**
	 * I handle initializing the application
	 * @returns {App}
	 */
	init: function () {
		console.log('<%= _.slugify(siteTitle) %> is ready to rock and roll!');
		this.startRouter(window.location.hash);
		$(document).trigger('hashchange');
		return this;
	},
	/**
	 * I handle listening to the hashchange event to load a page.
	 */
	startRouter: function (path) {
		$(window).on('hashchange', function (e) {
			$('.nav').find('.active').removeClass('active');
			path = e.currentTarget.location.hash.replace('#/', '').toLowerCase();
			App.loadPage(path);
		});
	},
	/**
	 * I handle loading a page into the .page element
	 * @param path
	 */
	loadPage: function (path) {
		if(path === ''){
			path = 'main';
		}
		$.get('pages/' + path + '.html').done(function (html) {
			$('[href="#/' + path + '"]').parent().toggleClass('active')
			$('.page').html(html);
		});
	}
};

$(document).ready(function () {
	window.App = App.init();
});

