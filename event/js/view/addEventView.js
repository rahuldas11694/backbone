/***********************addEventview********************************************/
var addEventView = Backbone.View.extend({ // main eventslist view
    //model: new Event(),
    //el: '#addPerson', // eform

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
        var template = Handlebars.compile(source);
        this.$el.html(template())

        new Event().displayList();

        return this
    }

});

