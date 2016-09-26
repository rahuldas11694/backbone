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
        console.log("trans", trans)

        request.onsuccess = function(event) {

            alert("data has been added to your database.");
        };

        request.onerror = function(event) {

            alert("Unable to add data\r\ndata aready exists in your database! ");
        };
    },
});

/***************************formView****************************************/
var formView = Backbone.View.extend({

    model: new Event(),

    //tagName: 'form',

    initialize: function(e) {
        console.log("form view")
            //new addEventView()
            // this.render(e);
    },



    events: {
        'click .add-event': 'add',
        'click #edit-event': 'edit'

    },

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

    edit: function() {
        console.log("88888888888999999999990000000000333333333334444444444444444444444")

    },

    // rendering the list of events in db
    render: function(e) {
        var source = $("#form-template").html();
        // console.log(source)
        var template = Handlebars.compile(source);
        // console.log(template())
        $("#addPerson").hide();
        this.$el.html(template());
        console.log(this.$el)

        return this;
    }
});
/***********************addEventview********************************************/
var addEventView = Backbone.View.extend({
    //model: new Event(),
    el: '#addPerson', // eform

    initialize: function() {
        //console.log("addEventview getting initialized")

    },

    events: {
        'click #add-event': 'onClick'

    },
    
     
   

    onClick: function() {

        router.navigate('add', { trigger: true });
    },

    // rendering the form
    render: function(e) {

        var source = $("#event-list-template").html();
        //console.log(source)
        var template = Handlebars.compile(source);
        //console.log(template)

        /******************#########################***************************/
        var transaction = db.transaction(["EVENTDATA2"], "readonly");
        var objectStore = transaction.objectStore("EVENTDATA2");

        var cursor = objectStore.openCursor();

        cursor.onsuccess = function(e) {
            
            var res = e.target.result;
            console.log(res)


            if (res) {

                var context = { eventName: res.value.name, eventDate: res.value.eventDate, description: res.value.description };

                var html = template(context);


                $(".container").append(html);



                res.continue();
            }
            
        }
    }

});
var aev = new addEventView();



var Router = Backbone.Router.extend({
    initialize: function() {
        console.log("router initialized addEventview also initialized");

    },

    routes: {

        "add": "addEvent", // for  add  event  page  i.e index.html
        "events": "eventsList", // this is for the event list on our index.html

    },
    addEvent: function() {
        var form = new formView();
        // console.log("addEvent",new formView().render().$el)
        $(".container").html("");
        $(".container").html(form.render().$el);

    },
    eventsList: function() {

        new addEventView().render(event);

        console.log("shows evets list")

    }
});


//$(document).submit(function(e) { // this statement stops from page refreshing or yu can use return false
  //  e.preventDefault();
//});
