// backbone model for for file indexBlog.html
// FROM YOUTUBE

var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }

});

// backbone collection 
var Blogs = Backbone.Collection.extend({});
/*
// instantiate 2 blogs
var blog1 = new Blog(
{
author:"rahul",
title:"rahul's blog",
url: "mail.com"

}) ;


var blog2 = new Blog(
{
    author:"ram",
title:"ram's blog",
url: "rammail.com"
});
*/

//instantiate a collection

var blogs = new Blogs(); //new  Blogs([blog1,blog2]);  this is for 2 views


// backbone view for one blog

var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function() {
          //var blt = document.getElementById('blogs-list-template').innerHTML;
          //var template= Handlebars.compile(blt);
console.log("template",template);
        this.template = _.template($('.blogs-list-template').html());
    },

    events: {
        'click .edit-blog': 'edit'
    },

    edit: function() {

        $('edit-blog').hide();
        $('delete-blog').hide();
        $('update-blog').show();
        $('cancle-blog').show();

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        this.$('.author').html('<input type="text" class="form-control author-update" value=" ' + author + '" >');
        this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + ' ">');
        this.$('.url').html('<input type="text" class="form-control url-update" value=" ' + url + '">');
    },
    update: function() {
        this.model.set('author', $('.author-update').val());
        // only the author will get updated title nd url wont 
        // for this we do settimeout in BlogsView
        this.model.set('title', $('.title-update').val());
        this.model.set('url', $('.url-update').val());
        //now we wiill chnge the BlogsView

    },



    render: function() {


 this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});
// bacbone view for all blogs
var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),

    initialize: function() {
        this.model.on('add', this.render, this);
    },

    render: function() {
        var self = this;
        this.$el.html('');
        
        
        
        // underscore
        /*_.each(this.model.toArray(), function(blog) {
            self.$el.append((new BlogView({ model: blog })).render().$el);
        });*/
        return this;
    }
});

var blogsView = new BlogsView(); // need to instantiate it b4 
console.log("document ready")
$(document).ready(function() {
    console.log("document ready")
    $('.add-blog').on('click', function() {
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val()
        });
        console.log(blog);
        blogs.add(blog); // so every time we add it it should trigger the initialize function of BlogsView and then render the page


        $('.author-input').val(''),
            $('.title-input').val(''),
            $('.url-input').val(''),

            console.log("document blog.to toJSON ", blog.toJSON)
    }); // before doing that u need to instantiate the var blogsView = new BlogsView();






});
