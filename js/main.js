require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: '../assets/jquery.min',
		underscore: '../assets/lodash.min',
		backbone: '../assets/backbone.min',
		text: '../assets/text.min'
	}
});

require([
	'views/app'
], function( App) {

	Backbone.history.start();
	// Init app view
	new App();
});
