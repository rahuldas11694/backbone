// event  //this file is for eform.html
//console.log("form view")
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

        var trans = db.transaction(["EVENTDATA5"], "readwrite")
            .objectStore("EVENTDATA5").add(json)

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
        console.log("form view")
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

        router.navigate('events', { trigger: true });
        //console.log("getting clicked")
        //console.log(this.$el.find('#place').val())
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
    },
    // rendering the list of events in db
    render: function(e) {
        var source = $("#event-list-template").html();
        console.log(source)
        var template = Handlebars.compile(source);
        console.log(template)


        var context = { eventName: "My New Post", eventDate: "This is my first post!", description: "here" };
        var html = template(context);

        $("#addPerson").hide();
        this.$el.append(html);
        return this;


        console.log("^&^&^&^&^&^&^&^&^&^&^&^&^&^&^&^&^&^&^&^&")


    }

});
//var fv= new formView();

/***********************addEventview********************************************/

var addEventView = Backbone.View.extend({
    //model: new Event(),
    el: '#addPerson', // eform

    initialize: function() {
        console.log("addEventview getting initialized")

    },

    events: {
        'click #add-event': 'onClick',

    },
    onClick: function() {
        // console.log("onClick addEventview getting called")

        router.navigate('add', { trigger: true });

        //this.render(event);

        //console.log( "view");

    },
    // rendering the form
    render: function(e) {
        var source = $("#form-template").html();
        //console.log(source)
        var template = Handlebars.compile(source);
        //console.log(template)

        this.$el.append(template);
        //var context = {title: "My New Post", body: "This is my first post!"};
        new formView();
        return this;

   }
});

var aev = new addEventView();

/************************ROUTER*******************************************/

var Router = Backbone.Router.extend({
    initialize: function() {
        console.log("router initialized addEventview also initialized");
    },

    routes: {

        "add": "addEvent", // for  add  event  page  i.e index.html
        "events": "eventsList" // this is for the event list on our index.html


    },
    addEvent: function() {
        console.log("addEvent")
        new addEventView().render(event);


    },
    eventsList: function() {

        new formView().render(event);

        console.log("shows evets list")

    }


});
var router = new Router();
Backbone.history.start(); // to check what is after #

/*******************************************************************/

$(document).submit(function(e) { // this statement stops from page refreshing or yu can use return false
    e.preventDefault();
});
