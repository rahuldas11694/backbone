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
