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

        var trans = db.transaction(["EVENTDATA2"], "readwrite")
            .objectStore("EVENTDATA2").add(json)

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



    events: {
        'click .add-event': 'add',
        //'click .add-event':  'addEvent'
    },

    /*addEvent:function()
    {
      router.navigate("eventPage",true);
    },*/

    add: function() {
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
    }
});
//var fv= new formView();

/***********************addEventview********************************************/

var addEventView = Backbone.View.extend({
    //model: new Event(),
    el: '#addPerson',   // eform

    initialize: function() {
        //console.log("addEventview getting initialized")
    },

    events: {
        'click #add-event': 'onClick',

    },
    onClick: function() {
        // console.log("onClick addEventview getting called")

        router.navigate('add', { trigger: true });

        this.render(event);
        console.log( "view",new formView());

    },

    render: function(e) {


        this.$el.empty();
        /* var viewHtml = '<div class="leftpanel">this is left panel</div>'
        viewHtml += '<div class="rightpanel">this is right panel</div>'
        viewHtml += '<div class="controlpanel">'
        viewHtml += '<button class="LeftButton" style="float: left; width: auto ; ">Hide Left Panel</button>'
        viewHtml += '<a href="/Users/rahulsurvase/crud/event/eform.html"><button class="RightButton" style="float: left; width: auto;">Hide Right Panel</button></a>'
        viewHtml += '</div>' */

        /************************************************************************/
        var viewHtml = '<div id="form-div" class="frm-dv">'


        viewHtml += '<form id="event-form" >'

        viewHtml += ' <ul class="form-ul">'
        viewHtml += '<li>'
        viewHtml += '<label for="name">Event Name:</label>'
        viewHtml += '<label for="name">Event Name:</label>'
        viewHtml += '<input type="text" name="eventName" id="name" value="" />'
        viewHtml += '</li>'
        viewHtml += '<li>'
        viewHtml += ' <label for="email">Email:</label>'
        viewHtml += '<input type="text" name="email" id="email" />'
        viewHtml += '</li>'
        viewHtml += ' <li>'
        viewHtml += ' <label for="date">Date:</label>'
        viewHtml += '<input type="date" name="eventDate" id="date" />'
        viewHtml += '</li>'
        viewHtml += ' <li>'
        viewHtml += ' <label for="comments" class="descl">Description of Event:</label>'
        viewHtml += '<textarea name="description" id="desc" cols="25" rows="3"></textarea>'
        viewHtml += '</li>'
        viewHtml += ' <li>'
        viewHtml += '<label for="location">Place:</label>'
        viewHtml += '<input type="select" name="location" id="place" />'
        viewHtml += '</li>'
        viewHtml += '<li>'

        viewHtml += '<a><button class="btn btn-primary add-event" id="sb">Submit</button></a>'
        viewHtml += ' </li>'
        viewHtml += '</ul>'
        viewHtml += '</form></div>'



        /************************************************************************/
        this.$el.empty().append(viewHtml);
        return this;
    }
});

//var aev = new addEventView();

/************************ROUTER*******************************************/

var Router = Backbone.Router.extend({
    initialize: function() {
        console.log("router initialized addEventview also initialized");
        var aev = new addEventView();
    },

    routes: {

        "add": "addEvent", // for  add  event  page  i.e index.html
        "events": "eventsList" // this is for the event list on our index.html


    },
    addEvent: function() {
        console.log("addEvent")
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
