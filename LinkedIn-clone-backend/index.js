const express = require("express");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

// passport-jwt setup
// jwt_payload: {identifier: userId} ${process.env.MONGO_PASSWORD}
mongoose.connect("mongodb+srv://aborse2004:" + process.env.MONGO_PASSWORD + "@cluster1.i5lp8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
    {
        useNewUrlParser: true,
        useUnifiedTopology : true,
    }
).then((x) => {
    console.log("Connnected to mongo!");
})
.catch((error) => {
    console.log("Error occured while connecting to mongo");
    console.log(error);

});

let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = "thisIsSupposedToBeSecret";

 passport.use
 (
    new JwtStrategy(options, function(jwt_payload,done)
    {
       User.findOne({_id: jwt_payload.identifier}, function(err, user)
      {
          if(err)
          {
            done(err , false);
          }
          if(user)
          {
            done(null,user);
          }
          else
          {
           done(null,false);
          }
       });
    })
 );

app.get("/",(req,res)=>
{
    res.send("hello world");

});
app.get("/hello",(req,res)=>
    {
        res.send("hello");
    
    });
app.listen(3000,()=>{
    console.log("server working");
});
