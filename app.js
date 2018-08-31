var express = require("express"); 
var app = express(); 
var path = require('path'); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
Post = require('./models/posts');
Comment = require('./models/comment');
User = require('./models/user');
seedDB = require('./seeds');

var commentRoutes = require('./routes/comments');
var postsRoutes = require("./routes/posts");
var indexRoutes = require('./routes/index');

mongoose.connect("mongodb://localhost/orbittle");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs"); 
app.use(methodOverride("_method"));


// seedDB(); // Seed the DB.

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "A password secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use("/", indexRoutes);
app.use("/posts/:id/comments", commentRoutes);
app.use("/posts", postsRoutes);


app.listen(3000, function(){
    console.log('Servers are all up and running now.'); 
})
   