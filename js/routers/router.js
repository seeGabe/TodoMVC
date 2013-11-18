// Todo Router

var Workspace = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter'
	},
	setFilter: function(){
		// set the current filter to be used
		// trigger a collection filter event
		// causing hiding/unhiding of View items
		window.app.Todos.trigger('filter');
	}
});

app.TodoRouter = new Workspace();
Backbone.history.start();