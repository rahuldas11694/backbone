// event  //this file is for eform.html
//console.log("form view")
/***********        *******     ********     ***********   ***********   **********   **********/
var Event = Backbone.Model.extend({
    defaults: {
        eventName: '',
        email: '',
        location: '',
        eventDate: '',
        description: '',
        idAttribute: "id"

    },


    save: function(json) {
        //here

        console.log("save fun called and createObjectStore here")
        console.log(db)
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

    edit: function(id, callback) {
        var that = this
        console.log(event)
        var trans = db.transaction(["EVENTDATA2"], "readwrite")
            .objectStore("EVENTDATA2").get(Number(id));

        //console.log(trans);

        trans.onsuccess = function(e) {
                console.log("BBBBBBB", e.target.result)
                var data = e.target.result;
                console.log("BBBBBBBBBB", data);
                //that.set(data)
                var setData = that.set({ id: id, eventName: data.eventName, eventDate: data.eventDate, location: data.location, email: data.email, description: data.description });
                 

                callback(data);
           

                console.log("AFTER CALL BACK id ==", id,"and data  id",data.id,data)






            } //edit

    }



}); // model end

/***************************formView****************************************/
var formView = Backbone.View.extend({ // add/edit form view

    model: new Event(),
    initialize: function(e) {
        console.log("form view")

        this.listenTo(this.model, 'change', this.render);
    },
    events: {
        'click .add-event': 'add',
        'click .edit-event': 'update',
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
            eventName: eventName,
            email: email,
            location: location,
            eventDate: eventDate,
            description: description
        }
        console.log("JSON", json)
            //new Event().update();      
        this.model.save(json); // calling the save fun to stor data in db 

        return false
    },

    update: function(id) {
        console.log("update id==", id)
        var that = this;
            /*******************************************************************/
        var transaction = db.transaction(["EVENTDATA2"], "readwrite");

        var objectStore = transaction.objectStore("EVENTDATA2");

        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            console.log(cursor)

             if (cursor) {
                console.log(cursor.key, that.model.get("id"))
            if (cursor.key == that.model.get("id")) {
                var updateName = cursor.value;
                var updateDate = cursor.value;
                var updateDescription = cursor.value;
                var updateEmail = cursor.value;
                var updateLocation= cursor.value;
                // var updateDate =

                console.log("update Data", updateName);

                updateName.eventName= $("#name").val();
                updateDate.eventDate = $("#date").val();
                updateDescription.description= $("#desc").val();
                updateEmail.email = $("#email").val();
                updateLocation.location=$("#place").val();
                console.log("TRUE", updateName)

                var request = cursor.update(updateName, updateDate,updateEmail,updateDescription);

                request.onsuccess=function()
                    {console.log("updated name")
                        router.navigate('events', { trigger: true });
                    };



            }
            cursor.continue();
            }
            else{console.log("not updated")}
        }
     return false
    },

    // rendering the list of events in db
    render: function(e) {
        var source = $("#form-template").html();
        // console.log(source)
        var template = Handlebars.compile(source);
        // console.log(template())
        // $("#addPerson").hide();
        this.$el.html(template(this.model.toJSON()));

        // this.$el.html(template());
        return this;
    }
});

/***********************addEventview********************************************/
var addEventView = Backbone.View.extend({ // main eventslist view
    //model: new Event(),
    // el: '#addPerson', // eform

    initialize: function() {
        console.log("addEventview getting initialized")

        $("#addPerson").show();
    },

    events: {

        'click #add-event': 'onClick'
    },

    onClick: function() {

        router.navigate('add', { trigger: true });
    },

    // rendering the form
    render: function(e) {
        var source = $("#events-list-add-template").html()

        //console.log(source)
        var template = Handlebars.compile(source);
        this.$el.html(template())
            //console.log(template)
            /******************#########################***************************/
        var transaction = db.transaction(["EVENTDATA2"], "readonly");
        var objectStore = transaction.objectStore("EVENTDATA2");

        var cursor = objectStore.openCursor();

        cursor.onsuccess = function(e) {

            var res = e.target.result;

            //console.log("#%#%#%#%#%#%#%#%#%#%#%#%#%", res)


            if (res != null) {
                var context = { eventName: res.value.eventName, eventDate: res.value.eventDate, email: res.value.email, description: res.value.description, id: res.key };
                //console.log(context)
                var ev = new EventsView({

                    model: new Event(context)

                });

                $(".container").append(ev.render().$el)

                res.continue();
            }
        }
        return this
    }

});
// var aev = new addEventView();

var EventsView = Backbone.View.extend( // event view
    {

        // el:'.list',
        initialize: function() {
            //console.log("*************$$$$$$$$$$$");

        },
        render: function() {
            var source = $("#event-list-template").html();
            //console.log(source)
            var template = Handlebars.compile(source);
            //console.log(template)

            var html = template(this.model.toJSON());

            this.$el.html(html);
            return this
        },

        events: {
            'click .edit-event': 'update',
            'click .delete-event': 'delete'


        },

        update: function(event) {
            var id = Number(event.target.id);
            router.navigate("edit/" + id, { trigger: true });
        },

        delete: function(event) {
            var id = event.target.id;
            console.log("DELETE++++", event.target.id)
            var t = db.transaction(["EVENTDATA2"], "readwrite");
            var request = t.objectStore("EVENTDATA2").delete(Number(id));


            request.onsuccess = function(event) {

             

            };

        }

    });

var Router = Backbone.Router.extend({
    initialize: function() {
        console.log("router initialized addEventview also initialized");

    },

    routes: {

        "add": "addEvent", // for  add  event  page  i.e index.html
        "events": "eventsList", // this is for the event list on our index.html
        "edit/:id": "edits"
    },
    addEvent: function() {
        var form = new formView();
        // console.log("addEvent",new formView().render().$el)
        $(".container").html("");
        $(".container").html(form.render().$el);

    },

    eventsList: function() {


        $(".container").html(new addEventView().render(event).$el);

        console.log("shows evets list")

    },

    edits: function(id) {
        var event = new Event()

        event.edit(id, function(data) {
            console.log("das", data)
            var form = new formView({ model: event });

            $(".container").html(form.render().$el);



        })

    }

});

// $(document).submit(function(e) { // this statement stops from page refreshing or yu can use return false
//     e.preventDefault();
// });
