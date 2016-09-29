var editformView = Backbone.View.extend({ // add/edit form view

    model: new Event(),
    initialize: function(e) {
        console.log(" edit form view")

        this.listenTo(this.model, 'change', this.render);
    },
    events: {
        'click .edit-event': 'update',
    },
     
     update: function()
     {


     }
    
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