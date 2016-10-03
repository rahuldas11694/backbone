var Router = Backbone.Router.extend({
    initialize: function(e) {
        console.log("router initialized addEventview also initialized");
         //router.navigate('events', { trigger: true });

       // this.edits(e);
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
