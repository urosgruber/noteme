// collections/notes.js
define([
	'underscore',
	'backbone',
	'models/note'
], function( _, Backbone, Note ) {

	var Notes = Backbone.Collection.extend({
		model: Note,
		url: 'http://noteme.herokuapp.com/notes',
		comparator: function(item) {
			return item.get("id");
		}
	});
	return new Notes();
});
