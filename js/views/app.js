// app.js

define([
	'jquery',
	'underscore',
	'backbone',
	'collections/notes',
	'views/note'
], function( $, _, Backbone, Notes, NoteView) {

	var App = Backbone.View.extend({

		el: '#noteme-app',

		events: {
			'keypress #new-note': 'createNote',
			'click #remove-completed': 'removeCompleted'
		},

		initialize: function() {
			this.$id = this.$('#note-id');
			this.$input = this.$('#new-note');
			this.$notes = this.$('#note-list');

			this.listenTo(Notes, 'add',   this.addNote);
			this.listenTo(Notes, 'reset', this.addAll);

			Notes.fetch();
		},

		addNote: function( note ) {
			var view = new NoteView({ model: note });
			this.$notes.append( view.render().el );
		},

		addAll: function() {
			this.$notes.html('');
			Notes.each(this.addNote, this);
		},

		removeCompleted: function() {
			_.invoke(Notes.completed(), 'destroy');
			return false;
		},

		createNote: function( e ) {
			if ( e.which === 13 && !e.shiftKey) {
				if (this.$('#note-id').val()) {
					var model = Notes.get(this.$id.val());
					model.set({'content' : this.$input.val().trim()});
					model.save({
						error: this.handleError
					});
				} else {
					Notes.create({
						content: this.$input.val().trim(),
						completed: 0
					},{
						wait: true,
						error: this.handleError
					});
				}
				this.$input.val('');
				this.$id.val('');
				return false;
			}
			return;
		},

		handleError: function(model, error, xhr) {
			var errors = JSON.parse(error.responseText).errors;
			alert('Note ' + _.first(errors).content);
		}
	});

	return App;
});
