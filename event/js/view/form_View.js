var formView = Backbone.View.extend({ // add/edit form view

    model: new Event(),
    initialize: function(e) {
        console.log("form view")
        //router.navigate('events', { trigger: true });


      },
    events: {
        'click .add-event': 'add',
        'click .edit-event': 'update',
    },

    add: function() {

        router.navigate('events', { trigger: true });

        this.model.save(this.getData()); // calling the save fun to stor data in db 
        //return false;    // refreshes the ADD EVENT page if not written

    },

    update: function(event) {
        // console.log("pppppp", id)
        console.log($(event.currentTarget))
        new Event().displayUpdate($(event.currentTarget).attr("id"), this.getData());
        console.log("+/+/+/+/+/+-/-/-/-/-");

        return false

    },

    getData: function() {
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
        var source = $("#form-template").html();
        var template = Handlebars.compile(source);
        this.$el.html(template(this.model.toJSON()));
        return this;
    }

});
