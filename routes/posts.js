var express = require('express');
var router = express.Router();
var Post = require('../models/posts')
var middleware = require('../middleware');

router.get("/", function(req, res){
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else {
            res.render("posts/index", {posts:allPosts, currentUser: req.user});
        }
    }); 
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var author  = { 
        id: req.user._id,
        username: req.user.username
    }
    var newPost  = {title: title, description: description, author:author}
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
            res.redirect("/posts");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("posts/new"); 
});

router.get("/:id", function(req, res){
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            res.render("posts/shows", {post: foundPost});
        }
    });
    req.params.id
});

// Edit post route
router.get("/:id/edit", middleware.checkPostOwnership, function(req, res){
        Post.findById(req.params.id, function(err, foundPost){
            res.render("./posts/edit", {post: foundPost});
        });
});

// Update post route
router.put("/:id", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatePost){
        if(err){
            res.redirect("/posts");
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

// Destroy post route
router.delete("/:id", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/posts");
        } else{
            res.redirect("/posts");
        }
    });
});


module.exports = router;