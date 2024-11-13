const express=require ("express");
const {ExtractJwt, JwtStrategy}=require("passport-jwt");
const app=express();


//passport-jwt-setup
//jwt_payload:{identifier:userId}
let opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey ="thisIsSupposedToBeSecret";
passport.use(new JwtStrategy(opts, function(jwt_paayload,done){
 User.findOne({_id:jwt_paayload.identifier}, function(err,user){
    if(err){
      done(err,false);
    }
    if(user){
      done(null, user);
    }
    else{
      done(null,false);
    }
 });
}))




app.get("/",(req,res)=>{
  res.send("I am working");
});

app.get("/hello", (req,res)=>{
    res.send("Hello world. This is a server");
});
//server start
app.listen(3000, ()=>{
  console.log("server is working");
});