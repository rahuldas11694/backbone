/***********************addEventview********************************************/
var addEventView = Backbone.View.extend({ // main eventslist view
    //model: new Event(),
    // el: '#addPerson', // eform

    initialize: function() {
        console.log("addEventview getting initialized")

        

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
        //console.log(this.el)
        //console.log(this.$el)
        this.$el.html(template())

        new Event().displayList();
            //console.log(template)
         /******************#########################***************************/
        // var transaction = db.transaction(["EVENTDATA2"], "readonly");
        // var objectStore = transaction.objectStore("EVENTDATA2");

        // var cursor = objectStore.openCursor();

        // cursor.onsuccess = function(e) {

        //     var res = e.target.result;

        //     //console.log("#%#%#%#%#%#%#%#%#%#%#%#%#%", res)


        //     if (res != null) {
        //         var context = { eventName: res.value.eventName, eventDate: res.value.eventDate, email: res.value.email, description: res.value.description, id: res.key };
        //         //console.log(context)
        //         var ev = new EventsView({

        //             model: new Event(context)

        //         });
                    
                // $(".container").append(ev.render().$el)

        //         res.continue();
        //     }
        // }
        return this
    }

});
// var aev = new addEventView();
