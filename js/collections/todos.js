// Todo Collection
// ===============
var app = app || {};
// The collection of todos is backed by  *local Storage* instead of remote server

var TodoList = Backbone.Collection.extend({
	// refrence to the MODEL
	model: app.Todo,
	
	// save all of the todo items under the '"todos-backbone"' namespace
	// you need to have the Backbone.LocalStorage plug-in loaded
	// if you don't -- comment out the next line
	// if you don't -- comment out the next line
	localStorage: new Backbone.localStorage('todos-backbone'),
	
	// Filter down the list of all todo items that are finished
	completed: function(){
		return this.filter(function(todo){
			return todo.get('completed');
		});
	},
	// Filter the list to only todos that are still not finished
	remaining: function(){
		// apply allows us to define the context of this within the function scope
		return this.without.apply(this, this.completed());
	},
	// we keep the todos in sqeuential order, sepite being saved by unordered GUID
	// in the DB. this generates the next order number for the new items
	nextOrder: function(){
		if (!this.length){
			return 1;
		}
		return this.last().get('order') + 1;
	},	
	// Todos are sorted by thier original insertion order
	comparator: function(todo){
		return todo.get('order');
	}
});

// create our global collection of *Todos*
app.Todos = new TodoList();