var EventsView = Backbone.View.extend( // event view
    {

        // el:'.list',
        initialize: function() {
            //console.log("*************$$$$$$$$$$$");
           // new addEventView().render(e);
$("#addPerson").show();
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
            var id = Number(event.target.id);
            router.navigate("edit/" + id, { trigger: true });
        },

        delete: function(event) {
            var id = event.target.id;
            console.log("DELETE++++", event.target.id)
            new Event().deleteList(id)
            

           // MOVE ALL THE DB's in model not to write in view


      //       var t = db.transaction(["EVENTDATA2"], "readwrite");
      //       var request = t.objectStore("EVENTDATA2").delete(Number(id));


      //       request.onsuccess = function(event) {

      // //new addEventView().render();


      //       };

        }

    });
