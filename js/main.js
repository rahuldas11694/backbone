(function() {

window.App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers:{}
};

window.template = function(id) {
	return _.template( $('#' + id).html() );
};

/*******************************************************/
   //'RouteMenu' is a name of the view class
      App.Routers.RouteMenu = Backbone.View.extend({
            el: '#routemenu',  //'el' defines which element to be used as the view reference

            //defines a click event to occur on link
            events: {
               'click a' : 'onClick'
            },

            //After clicking on a link, router calls 'navigate' to update URL
            onClick: function( e ) {
               router.navigate('/');
            }
        });

        //'Router' is a name of the router class
        var Router = Backbone.Router.extend({

        //The 'routes' maps URLs with parameters to functions on your router
           routes: {
              'route/:id' : 'defaultRoute'
           },
        });

        //'routemenu' is an instance of the view class
        var routemenu = new App.Routers.RouteMenu();

        //It starts listening to the routes and manages the history for bookmarkable URL's
        Backbone.history.start();
    //});


/*******************************************************/


// Person Model
  App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: "zcmnz c",
		age: "Specify the age",
		occupation: 'specify the Occupation'
	}
});

// A List of People
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});


// View for all people
App.Views.People = Backbone.View.extend({
	tagName: 'ul',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},
	
	render: function() {
		this.collection.each(this.addOne, this);

		return this;
	},

	addOne: function(person) {
		var personView = new App.Views.Person({ model: person });
		this.$el.append(personView.render().el);
	}
});

// The View for a Person
App.Views.Person = Backbone.View.extend({
	tagName: 'li',

	template: template('personTemplate'),	
	
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},
	
	events: {
	 'click .edit' :'editPerson',
	 'click .delete' : 'DestroyPerson'	
	},
	
	editPerson: function(){
		var newName = prompt("Please enter the new name", this.model.get('name'));
		if (!newName) return;
		this.model.set('name', newName);
	},
	
	DestroyPerson: function(){
		this.model.destroy();
	},
	
	remove: function(){
		this.$el.remove();
	},
	
	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});


App.Views.AddPerson = Backbone.View.extend({
	el: '#addPerson',

	events: {
		'submit': 'submit'
	},

	submit: function(e) {
		e.preventDefault();
		var newPersonName = $(e.currentTarget).find('input[type=text]').val();
		var person = new App.Models.Person({ name: newPersonName });
		this.collection.add(person);

	}
});


var peopleCollection = new App.Collections.People([
	{
		name: 'Mohit Jain',
		age: 26
	},
	{
		name: 'Taroon Tyagi',
		age: 25,
		occupation: 'web designer'
	},
	{
		name: 'Rahul Narang',
		age: 26,
		occupation: 'Java Developer'
	}
]);
var addPersonView = new App.Views.AddPerson({ collection: peopleCollection });
peopleView = new App.Views.People({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);
});


