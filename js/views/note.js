// views/notes.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/note.html'
], function( $, _, Backbone, noteTmpl ) {

	var NoteView = Backbone.View.extend({

		tagName:  'li',
		template: _.template( noteTmpl ),

		events: {
			'click .toggle': 'toggleCompleted',
			'click .remove': 'destroy',
			'dblclick span': 'edit'
		},

		initialize: function() {
			_.bindAll(this, 'edit');
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			this.$el.toggleClass( 'completed', this.isCompleted());

			return this;
		},

		isCompleted: function() {
			return this.model.isCompleted();
		},


		toggleCompleted: function() {
			this.model.toggle();
		},

		edit: function() {
			$('#note-id').val(this.model.get('id'));
			$('#new-note').val(this.model.get('content')).focus();
		},

		destroy: function() {
			this.model.destroy();
		}
	});

	return NoteView;
});
