// models/note.js
define([
	'underscore',
	'backbone'
], function( _, Backbone ) {

	var Note = Backbone.Model.extend({

		defaults: {
			content: '',
			completed: 0
		},

		sync: function (method, model, options) {
			if (method === 'create' || method === 'update') {
				var data = _.extend({note : model.toJSON()});
				options.data = JSON.stringify(data);
			}
			return Backbone.sync.apply(this, arguments);
		},

		toggle: function() {
			this.save({
				completed: 1 - this.get('completed')
			});
		},

		isCompleted: function()
		{
			return !!this.get('completed');
		}
	});

	return Note;
});
