var formView = Backbone.View.extend({ // add/edit form view

    model: new Event(),
    initialize: function(e) {
        console.log("form view")


        // this.listenTo(this.model, 'change', this.render);
    },
    events: {
        'click .add-event': 'add',
        'click .edit-event': 'update',
    },

    add: function() {

        router.navigate('events', { trigger: true });
        //console.log("getting clicked")
        //console.log(this.$el.find('#place').val())
        // var eventName = this.$el.find('#name').val();

        // var email = this.$el.find('#email').val();

        // var location = this.$el.find('#place').val();

        // var eventDate = this.$el.find('#date').val();

        // var description = this.$el.find('#desc').val();

        // console.log("calling to model save")
        // var json = {
        //     eventName: eventName,
        //     email: email,
        //     location: location,
        //     eventDate: eventDate,
        //     description: description
        // }
        // console.log("JSON", json)
            //new Event().update();      
        this.model.save(this.getData()); // calling the save fun to stor data in db 
        return false
        //return false     it will refresh th epage after adding new user to the model
    },

    update: function(event) {
        // console.log("pppppp", id)
        new Event().displayUpdate($(event.currentTarget).attr("id"), this.getData());
         console.log("++++++++++++++++--------");
               // var that = this;
        // /*******************************************************************/
        // var transaction = db.transaction(["EVENTDATA2"], "readwrite");

        // var objectStore = transaction.objectStore("EVENTDATA2");

        // objectStore.openCursor().onsuccess = function(event) {
        //     var cursor = event.target.result;
        //     console.log(cursor)

        //     if (cursor) {
        //         console.log(cursor.key, that.model.get("id"))
        //         if (cursor.key == that.model.get("id")){
        //             var updateName = cursor.value;
        //             var updateDate = cursor.value;
        //             var updateDescription = cursor.value;
        //             var updateEmail = cursor.value;
        //             var updateLocation = cursor.value;
        //             // var updateDate =

        //             console.log("update Data", updateName);

                    // updateName.eventName = that.$el.find("#name").val();
                    // updateDate.eventDate = that.$el.find("#date").val();
                    // updateDescription.description =that.$el.find("#desc").val();
                    // updateEmail.email =that.$el.find("#email").val();
                    // updateLocation.location =that.$el.find("#place").val();
                    // console.log("TRUE", updateName)

        //             var request = cursor.update(updateName, updateDate, updateEmail, updateDescription);

        //             request.onsuccess = function() {
        //                 console.log("updated name")
        //                 router.navigate('events', { trigger: true });
        //             };

        //         }
        //         cursor.continue();
        //     } else { console.log("not updated") }
        // }
        return false
        
    },

    getData: function(){
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
        return json
    },



    // rendering the list of events in db
    render: function(e) {

        // console.log("this is formView",this.$el("#form-template"))
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

