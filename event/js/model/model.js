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
        //idAttribute: "id"

    },

    initialize: function(e) {
        // var a = new formView().render(e);
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


                console.log("AFTER CALL BACK id ==", id, "and data  id", data.id, data)

            } //edit
    },

    displayList: function() {
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

                $(".container").append(ev.render().$el);
                res.continue();
            }
        }
    },

    displayUpdate: function(id, data) {
        console.log("QQQQQQQQ", id)
        var that = this;
        /*******************************************************************/
        var transaction = db.transaction(["EVENTDATA2"], "readwrite");

        var objectStore = transaction.objectStore("EVENTDATA2");
        //console.log("OBJECT STORE", objectStore)
        objectStore.openCursor().onsuccess = function(event) {
            // console.log("RRRRRRRR", id.currentTarget.id)
            var cursor = event.target.result;
            console.log("///////////////", cursor)


            if (cursor) {

                // console.log(cursor.key, id.currentTarget.id)

                if (cursor.key == id) {
                    // var updateName = cursor.value;
                    // var updateDate = cursor.value;
                    // var updateDescription = cursor.value;
                    // var updateEmail = cursor.value;
                    // var updateLocation = cursor.value;

                    console.log(cursor.value, data)
                    // console.log("update Data", updateName);

                    // updateName.eventName = $("#name").val();
                    // updateDate.eventDate = $("#date").val();
                    // updateDescription.description = $("#desc").val();
                    // updateEmail.email = $("#email").val();
                    // updateLocation.location = $("#place").val();

                    // console.log("TRUE", updateName)

                    data.id = cursor.key
                    var request = cursor.update(data);

                    request.onsuccess = function() {
                        console.log("updated name")
                        router.navigate('events', { trigger: true });
                    };

                }
                cursor.continue();
            } else { console.log("not updated") }
        }

    },

    deleteList: function(id) {

        console.log("delete list", id)
        var t = db.transaction(["EVENTDATA2"], "readwrite");
        var request = t.objectStore("EVENTDATA2").delete(Number(id));


        request.onsuccess = function(event) {

            //new addEventView().render();


            //       };

        }
    }

}); // model end n
