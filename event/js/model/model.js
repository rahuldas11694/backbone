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


    },

    initialize: function(e) {

        
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
      // function called from
    displayUpdate: function(id, data) {

if(window.location.hash == "#add")
{
console.log("hash change add")    
}
else if(window.location.hash == "#edit/"+id){



}
else
{window.location.hash = "#/events";

}


        console.log("QQQQQQQQ", id, data)
        var that = this;
        /******** ************ ********** *********** ********* ******** *********/
        var transaction = db.transaction(["EVENTDATA2"], "readwrite");

        var objectStore = transaction.objectStore("EVENTDATA2");
        //console.log("OBJECT STORE", objectStore)
        objectStore.openCursor().onsuccess = function(event) {
            // console.log("RRRRRRRR", id.currentTarget.id)
            var cursor = event.target.result;
            console.log("///////////////", cursor);


            if (cursor) {
                if (cursor.key == id) {

                    console.log(cursor.value, data)

                    data.id = cursor.key
                    console.log(data, data.id)
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
        //window.location.reload();      //for refreshing the page after deleting the data 
        Backbone.history.loadUrl(Backbone.history.fragment);

        }
    }

}); // model end n
