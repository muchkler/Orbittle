var mongoose = require('mongoose'); 
var Posts = require('./models/posts');
var Comment = require("./models/comment");

var data = [
    {
        title: "I told my doctor that I broke my arm in two places.", 
        description: "He told me to stop going to those places."
    },
    {
        title: "Did you hear about the inmate that stuttered?", 
        description: "He never finished his sentence."
    },
    {
        title: "If pronouncing my b's as v's makes me sound Russian, then soviet.", 
        description: "Title is self explanatory, really."
    }
]

function seedDB(){
    //Remove all posts.
    Post.remove({}, function(err){
        if(err){
        console.log(err);
        }
        console.log('Removed post!');
            // Add some posts.
        data.forEach(function(seed){
            Post.create(seed, function(err, post){
                if(err){
                    console.log(err);
                }   else 
                    console.log("Added a post");
                    Comment.create(
                        {
                            text: "This is a great post, keep it going!",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                post.comments.push(comment);
                                post.save();
                                console.log("Created new comment");
                            }
                        });
            });
      });
    });
}

module.exports = seedDB;