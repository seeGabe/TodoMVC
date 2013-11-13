// Todo Model
// ==========
// Basic *todo* model has 'title', 'order', and 'completed' attribs.

var app = app || {};

app.Todo = Backbone.Model.extend({
	// default attribs ensure that each todo is created has a 'title'
	// and 'completed' keys
	defaults: {
		title: '',
		completed: false
	},
	// toggle the 'completed' state of each item
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		)};
	}

});