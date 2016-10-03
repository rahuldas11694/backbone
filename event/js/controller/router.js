var Router = Backbone.Router.extend({
    el: ".container",
    initialize: function(e) {
        console.log("router initialized addEventview also initialized");
        //router.navigate('events', { trigger: true });
        //window.location.href = "#/events";
        // this.edits(e);
    },

    routes: {

        "add": "addEvent", // for  add  event  page  i.e index.html
        "events": "eventsList", // this is for the event list on our index.html
        "edit/:id": "edits",
        '*notFound': 'notFound'

    },
    notFound: function() {
        //this.navigate("events", { trigger: true })
        if(window.location.hash =="")
        {
this.navigate("events", { trigger: true })
        }else{
        console.log("404errrr")
        $("#c").html("Page Not Found: 404 Error....");
}
    },
    addEvent: function() {
        

        var form = new formView();
        console.log("DOLLAR DOLLAR", this.el)
            // console.log("addEvent",new formView().render().$el)
            //this.$el(".container").html("");
        console.log("DOLLAR", $(this.el))

        $(this.el).html("");
        $(this.el).html(form.render().$el);
        //$(".container").html("");
        //$(".container").html(form.render().$el);


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
