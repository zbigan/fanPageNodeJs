var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Soprano = require("./models/soprano"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")


mongoose.Promise = global.Promise;
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v5";
// var url = "mongodb://localhost/yelp_camp_v5";
mongoose.connect(url);
// mongoose.connect("mongodb://soprano:soprano@ds125388.mlab.com:25388/webdev");
console.log(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all characters
app.get("/sopranos", function(req, res){
    //Get all sopranos from DB
    Soprano.find({}, function(err, allSopranos){
        if(err){
            console.log(err);
        } else {
            res.render("sopranos/index", {sopranos: allSopranos});
        }
    });
    
    
});

app.post("/sopranos", function(req, res){
    //get data from form and add to sopranos array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCharacter = {name: name, image: image, description: desc};
    // Create a new campground and save to database
    Soprano.create(newCharacter, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
              //redirect back to sopranos page
            res.redirect("/sopranos");
        }
    })
    
  
    
    
});

app.get("/sopranos/new", function(req, res) {
    res.render("sopranos/new");
});

//SHOW-SHOWS MORE INFO ABOUT CHARACTER
app.get("/sopranos/:id", function(req, res){
    //find character with provided id
    Soprano.findById(req.params.id).populate("comments").exec(function(err, foundSoprano){
        if(err){
            console.log(err);
        } else{
            console.log(foundSoprano);
            //render show template with that soprano
            res.render("sopranos/show", {soprano: foundSoprano});
        }
    });
    
    //render show template with that character
    
});



//============================
//  COMMENTS ROUTES
//============================

app.get("/sopranos/:id/comments/new", function(req, res) {
    //find soprano by id and send when render
    Soprano.findById(req.params.id, function(err, soprano){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {soprano: soprano});
        }
    });
});


app.post("/sopranos/:id/comments", function(req, res){
    //lookup soprano using id
    Soprano.findById(req.params.id, function(err, soprano){
        if (err){
            console.log(err);
            res.redirect("/sopranos");
        } else{
            
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    soprano.comments.push(comment._id);
                    soprano.save();
                    res.redirect("/sopranos/" + soprano._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to soprano
    // redirect to soprano show page
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!!!");
});