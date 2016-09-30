var firstview =Backbone.View.extend( {
	el:"#addPerson",

	initialize:function()
	{

		console.log("first View");
		$("#addPerson").show();

	}
});

new firstview();