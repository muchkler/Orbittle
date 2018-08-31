var express = require('express');
var router = express.Router({mergeParams: true});
var Post = require("../models/posts");
var User = require("../models/user");
var middleware = require('../middleware');

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, post){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {post: post});
        }   
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function (req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err)
            redirect("/posts");
        } else{ 
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                } else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/posts/" + post._id);
                }
            });
        }
    });
});

// Edit Route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       } else {
         res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
       }
    });
 });

// Comment update

 router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
 });


// COMMENTS destroy route

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    }); 
});

//Middleware



module.exports = router;