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
