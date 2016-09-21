// event  //this file is for eform.html

(function($) {
    //console.log("b . js")
    $.fn.serializeFormJSON = function() {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    //console.log("end fun")
})(jQuery);


/********************************************************************/
var eventData = $(this).serializeFormJSON();

//console.log("event data",eventData);
var Event = Backbone.Model.extend(
{
  defaults:{
  	eventName:'',
  	email:'',
  	location: '',
  	eventDate:'',
    description:''
  }
});

// backbone collection
var Events = Backbone.Collection.extend({})

// instantiate 2 Events

var event1 = new Event(
{
eventName:'BIG event',
  	email:'bigevent@mail.com',
  	location: 'bandra',
  	eventDate:'11/9/2016',
    description:'sdjndzczx ncjzczhkcjnfdd '
	});

var event2 = new Event(
{
eventName:'smalll event',
  	email:'smallevent@mail.com',
  	location: 'kurla',
  	eventDate:'12/10/2016',
    description:'zncbz cxchnc zxczhzdnc zxczjcz '
	});


var events = new Events([event1, event2]);

// bcbn view for one Event list view

var EventView= Backbone.View.extend({
        
        model: new Event(),
        
        tagName : 'tr',

        initialize: function()
        {  //for handle bars
        	/*console.log("handlebars here ");
var source   = $("#events-list-template").html();
var template = Handlebars.compile(source);

var context = {eventName: "My New Post", eventDate: "This is my first post!" , description:"description"};
var html    = template(context);*/


   this.template = _.template($('.events-list-template').html());   //UNDERSCORE

        },
        render: function()
        {
        	this.$el.html(this.template(this.model.toJSON()));
        	return this;
        }
    });  
         



/********************************************************************/
//view for Form
var formView = Backbone.View.extend(
{
	model: new Event(),
   tagName:'form',

   events:
   {
    'click .add-event': 'add'
   },

   add: function()
   {
   	console.log(" form eventData",eventData)
     
   }
});

   











// bcbn view for all events

var EventsView = Backbone.View.extend(
{
  model: events,
  
  el: $('.events-list'),

  initialize : function()
  { console.log("initialize function of EventsView")
  	this.model.on('add', this.render, this);
  },

   render: function()
   {
   	console.log("render function of EventsView")
   	var self = this;
   	//this.$el.html('');  // this is to clear the form
   	// elements after you submit the form

//var source   = $("#events-list-template").html();
//var template = Handlebars.compile(source);

   _.each(this.model.toArray(), function(event)
   {
   	   console.log("underscore")
      self.$el.append((new EventView({model:event})).render().$el);
   });




     return this;
   
   }
});

var eventsView = new EventsView(); // need to instantiate

console.log("document ready")

$(document).ready(function()
     {
     	console.log("document ready")
       $('.add-event').on('click', function()
       {
         var event = new Event(
         {
         	eventName: $('#name').val(),
            
         	eventDate:$('#date').val(),
         	
         	description:$('#desc').val()

         });
     
     console.log( $('#name').val());

     events.add(event); //so every time we add
     //it should be trigger the initialize  function
     // of EventsView and then render the page
 
  
      
console.log("document event.to toJSON",event.toJSON )

$(document).submit(function(e) {    // this statement stops from page refreshing or yu can use return false
    e.preventDefault();
});


//return false      // this statement also stops from page refreshing

       });// b4 doing tht u need to initiate the
       // var eventsView = new EventsView();

     });

       









