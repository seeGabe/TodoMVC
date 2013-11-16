// Todo Item view
// ==============
var app =  app || {};

// DOM element for the todo item....
app.TodoView = Backbone.View.extend({
	// ... is a list item
	tagName: 'li',
	// cache the template function for an item
	template: _.template( $('#item-template').html() ),
	// the DOM event specific to the item
	events: {
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},
	// the TodoView listens for the changes to the model, rerendering.
	// since there is a 1-to-1 correspondence between a *Todo* and a *TodoView* in the app
	// we set a direct reference on the model for convenience.
	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
	},
	// rerender the titles of the todo item
	render: function(){
		this.$el.html( this.template( this.model.toJSON() ) );
		this.$input = this.$('.edit');
		return this;
	},
	// switch this view into 'editing' mode, displaying an input field
	edit: function(){
		this.$el.addClass('editing');
		this.$input.focus();
	},
	// close the 'editing' mode saving the changes
	close: function(){
		var value = this.$input.val().trim();
		
		if ( value ){
			this.model.save({ title:value });
		}
		this.$el.removeClass('editing');
	},
	// hitting 'enter' means we are done editing
	updateOnEnter: function( e ){
		if ( e.which === ENTER_KEY ){
			this.close();
		}
	}
});