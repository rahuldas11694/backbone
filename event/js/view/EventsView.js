var EventsView = Backbone.View.extend( // event view
    {

        // el:'.list',
        initialize: function() {

        },
        render: function() {

            var source = $("#event-list-template").html();
            //console.log(source)
            var template = Handlebars.compile(source);
            //console.log(template)

            var html = template(this.model.toJSON());

            this.$el.html(html);
            return this
        },

        events: {
            'click .edit-event': 'update',
            'click .delete-event': 'delete'
        },

        update: function(event) {
            event.preventDefault();
            var id = Number(event.target.id);

            router.navigate("edit/" + id, { trigger: true });
        },

        delete: function(event) {
            var id = event.target.id;
            console.log("DELETE++++", event.target.id)
            new Event().deleteList(id)
            //return true
        }

    });
