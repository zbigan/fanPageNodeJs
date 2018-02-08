var mongoose = require("mongoose");
var Soprano = require("./models/soprano");
var Comment = require("./models/comment");

var data = [
    {
        name: "Johnny Sack",
        image: "https://upload.wikimedia.org/wikipedia/en/3/39/JohnnySack.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        
    },
    {
        name: "Peter Paul",
        image: "https://s-media-cache-ak0.pinimg.com/originals/43/77/fc/4377fc7a0cb8c63b5dddeadec7bbcd81.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        
    },
    {
        name: "Anthony Soprano",
        image: "https://upload.wikimedia.org/wikipedia/ru/9/94/Tony_Soprano_Portrait.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        
    }
]

function seedDB(){
    //Remove all Sopranos
    Soprano.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed sopranos");
    });
    //add a few sopranos
    data.forEach(function(seed){
        Soprano.create(seed, function(err, character){
            if(err){
                console.log(err);
            } else{
                console.log("Added a character");
                //create a comment
                Comment.create(
                        {
                            text: "Really charizmatic character",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                character.comments.push(comment);
                                character.save();
                                console.log("Created new comment");
                                
                            }
                            
                            
                        }
                    );
            }
        });
    });
    
    
}

module.exports = seedDB;

