// The Application
// ===============

var app = app || {};

// our *appview* is the top level piece of the UI
app.AppView = Backbone.View.extend({
	// instead of generating a new element, bind to the existing skeleton
	// of the app aleady in the HTML
	el: '#todoapp',
	
	// template for the line of stats at the bottom of the app
	statsTemplate: _.template( $('#statsTemplate').html() ),
	
	//at initialization we bind to the relevant events on the 'todos' collection
	// --when items are added or changed
	initialize:function(){
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');
		
		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
		
		// moar
		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);
		this.listenTo(app.Todos, 'all', this.render);
		
		app.Todos.fetch();
	},
	
	// moar
	// rendering the app just mean refreeshing the statistics -- the rest is unchanged
	render: function(){
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;
		
		if  ( app.Todos.length ){
			this.$main.show();
			this.$footer.show();
			
			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));
			
			this.$('filters li a')
				.removeClass('selected')
				.filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
				.addClass('selected');
		} else {
		
		}
		this.allCheckbox.checked = !remaining;
	},
	// Add a single todo item to the list by creating a view for it
	// append its elemnt to the 'ul'
	addOne: function( todo ){
		var view = new app.TodoView({ model: todo });
		$('todo-list').append( view.render().el );
	},
	
	// Add all items in the todo collection at once
	addAll: function(){
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	},
	
	//moar
	filterOne : function( todo ){
		todo.trigger('visible');
	},
	filterAll : function(){
		app.Todos.each(this.filterOne, this);
	},
	// generate attribs for a new todo item
	newAttributes: function(){
		return{
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},
	// if you hit return in the main filed, create new Todo model
	// pushing it to localStorage
	createOnEnter: function( event ){
		if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
			return;
		}
		
		app.Todos.create( this.newAttributes() );
		this.$input.val('');
	},
	// clear all completed todo items, destroying thier models
	clearCompleted: function(){
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},
	toggleAllComplete: function(){
		var completed = this.allCheckbox.checked;
		
		app.Todos.each(function( todo ){
			todo.save({
				'completed': completed
			)};
		)};
	}
});