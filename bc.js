(function() {
    var User = Backbone.Model.extend({
        schema: {
            title:      { type: "Select", options: ["", "Mr", "Mrs", "Ms"] },
            name:       "Text",
            email:      { validators: ["required", "email"] },
            birthday:   "Date",
            password:   "Password",
            notes:      { type: "List", itemType: "Text" }
        }
    });
    
    var user = new User({
        title: "Mr",
        name: "Sterling Archer",
        email: "sterling@isis.com",
        birthday: new Date(1978, 6, 12),
        password: "dangerzone",
        notes: [
            "Buy new turtleneck",
            "Call Woodhouse",
            "Buy booze"
        ]
    });
    
    var form = new Backbone.Form({
        model: User
    }).render();
    
    $("body").append(form.el);
});
