const express = require("express");
const { ExtractJwt, JwtStrategy } = require("passport-jwt");

const app = express();

// passport-jwt setup
// jwt_payload: {identifier: userId}

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
