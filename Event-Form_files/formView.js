// event  //this file is for eform.html









/********************************************************************/
var Event = Backbone.Model.extend(
{
  defaults:{
    eventName:'',
    email:'',
    location: '',
    eventDate:'',
    description:''
  },


   save:function()
  {
    //here
   console.log("save fun called and createObjectStore here")

   var trans = db.transaction(["EVENTDATA"],"readwrite")
                 .objectStore("EVENTDATA")
                 .add({eventName:$('#name').val()
                  /*email:this.$el.find('#email').val(), 
                  place:this.$el.find('#place').val(), 
                  date:this.$el.find('#date').val(), 
                  description:this.$el.find('#description').val()*/
                });

                 console.log("trans",trans)

        request.onsuccess = function(event) {
            alert("data has been added to your database.");
        };

        request.onerror = function(event) {
            alert("Unable to add data\r\ndata aready exists in your database! ");
        };




                 
        


  }



});

 var formView = Backbone.View.extend(
 {

   model: new Event(),

   el:'#event-form',
    


initialize:function()
{

console.log("hiiiiii")
},


   events:
   {
    'click .add-event': 'add'
   },

   add: function()
   {

     
    console.log("getting clicked")
    console.log(this.$el.find('#place').val())
    var eventName=this.$el.find('#name').val();
    console.log(eventName)
    var  email=this.$el.find('#email').val();
    var location=this.$el.find('#place').val();
    var eventDate=this.$el.find('#date').val();
    var description=this.$el.find('#description').val();
     console.log("calling to model save")
     this.model.save();  // calling the save fun to stor data in db 
   }
    

 });

 var fv = new formView();

$(document).submit(function(e) {    // this statement stops from page refreshing or yu can use return false
    e.preventDefault();
});

