(function()
{
 
 window.App ={
 	Models:{},
    Collections:{},
    Views:{}

 };


 window.template = function(id)
 {
 	return _.template($('#'+ id).html());
 };

 // person model

 App.Models.Person = Backbone.Model.extend(
{
   defaults:{
   	name:"guest user",
   	age: 30,
   	occupation:"developer"
   }});

// A list of ppl

App.Collections.People = Backbone.Collection.extend(
{
model: App.Models.Person
});

// view for all ppl

App.Views.People = Backbone.View.extend(
{
tagName :"ul",

initialize: function()
{
	this.collection.on("add",this.addOne,this);
},

render: function() {
this.collection.each(this.addOne,this);
return this;

},

addOne : function(person)
{
	var personView = new App.Views.Person({model: person});
    
    console.log("PERSON VIEW",personView);
//  	$el.append((new TweetView({model:tweet})).render().$el.html());
	this.$el.append((new App.Views.Person({model: person})).render().$el.html());

}
});

// the View for a person

App.Views.Person = Backbone.View.extend(
{
	tagName: "li",

	template: template("personTemplate"),

	initialize: function()
	{
     this.model.on("change",this.render,this);
     this.model.on("destroy",this.remove,this);

	},

	events :
	{
     "click .edit" : "editPerson",
     "click .delete" : "DestroyPerson"

	},

editPerson : function()
{
	var newName = prompt("please enter the new name", this.model.get("name"));
	if(!newName	)
		return;
	this.model.set("name" , newName);

},

DestroyPerson : function()
{

	this.model.destroy();

},

remove: function()
{
	this.$el.remove();
},

render: function()
{
	this.$el.html(this.template(this.model.toJSON()));
}
});

App.Views.AddPerson = Backbone.View.extend(
{
el:"#addPerson",

events: {
	"submit": "submit"
},

submit: function(e)
{
	e.preventDefault();
	var newPersonName =$(e.currentTarget).find("input[type=text]").val();

	var person = new App.Models.Person({name: newPersonName});

	this.collection.add(person);

}
	
});

var peopleCollection = new App.Collections.People(
     [
      {
      	name:"rahul",
      	age:23
      },

      {
  	 	name:"jay",
  	 	age:25,
  	 	occupation: "dev"

      },

      {
      	name : "ram",
      	age: 35,
      	occupation:"javadev"
      }


    ]

	);

var addPersonView = new App.Views.AddPerson({collection : peopleCollection})

PeopleView = new App.Views.People({collection:peopleCollection});

$(document.body).append(PeopleView.render().el);
})();









	
