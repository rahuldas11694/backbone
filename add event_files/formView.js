// event  //this file is for eform.html
console.log("form view")
    /********************************************************************/
var Event = Backbone.Model.extend({
    defaults: {
        eventName: '',
        email: '',
        location: '',
        eventDate: '',
        description: ''
    },


    save: function(json) {
        //here
        console.log("save fun called and createObjectStore here")

        var trans = db.transaction(["EVENTDATA"], "readwrite")
            .objectStore("EVENTDATA").add(json)

        // you can also use this 

        /*.add({eventName:$('#name').val(),
         email:$('#email').val(), 
         place:$('#place').val(), 
         date:$('#date').val(), 
         description:$('#desc').val()*/
        console.log("trans", trans)

        request.onsuccess = function(event) {
            alert("data has been added to your database.");
        };

        request.onerror = function(event) {
            alert("Unable to add data\r\ndata aready exists in your database! ");
        };
    }
});

/***************************formView****************************************/
var formView = Backbone.View.extend({

    model: new Event(),

    el: '#event-form',
    initialize: function() {

        console.log("hiiiiii")
    },

    render: function() {
        // handle bars code here


    },


    events: {
        'click .add-event': 'add',
        //'click .add-event':  'addEvent'
    },

    /*addEvent:function()
    {
      router.navigate("eventPage",true);
    },*/

    add: function() {
        console.log("getting clicked")
        console.log(this.$el.find('#place').val())
        var eventName = this.$el.find('#name').val();
        var email = this.$el.find('#email').val();
        var location = this.$el.find('#place').val();
        var eventDate = this.$el.find('#date').val();
        var description = this.$el.find('#desc').val();
        console.log("calling to model save")
        var json = {
            name: eventName,
            email: email,
            location: location,
            eventDate: eventDate,
            description: description

        }
        this.model.save(json); // calling the save fun to stor data in db 
    }
});
var fv = new formView();

/***********************addEventview********************************************/

var addEventView = Backbone.View.extend(
{
  el :'#addPerson',

  initialize:function()
  {
    console.log("addEventview getting initialized")
  },

  events:
  {
     'click #add-event':'onClick'
  },
  onClick:function()
  {
     console.log("addEventview getting called")
     router.navigate('#add');
  }



});

var aev = new addEventView();

/************************ROUTER*******************************************/

var Router = Backbone.Router.extend({
    initialize: function() {
        console.log("router initialized");
    },

    routes: {

        "add": "addEvent", // for  add  event  page  i.e index.html
        "events": "eventsList" // this is for the event list on our index.html


    },
    addEvent: function() {
        var aev = new addEventView(); 
        //var fv = new formView(); //instantiated bcz we wnt to show the page that is 
        //rendering the page using handlebars 

        console.log("routes")
    },
    eventsList: function() {
         
        console.log("shows evets list")

    }


});
var router = new Router();
Backbone.history.start(); // to check what is after #

/*******************************************************************/



/*******************************************************************/



$(document).submit(function(e) { // this statement stops from page refreshing or yu can use return false
    e.preventDefault();
});
