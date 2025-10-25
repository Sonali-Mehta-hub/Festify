require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
    console.log(process.env.SECRET);
}

const express =  require("express");
const app = express();
const mongoose =require("mongoose");
const path = require("path");
const methodOverride= require("method-override");
const EjsMate = require("ejs-mate");
const ExpressError =require("./utils/ExpressError.js");
const listingsRoute = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const Session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/users.js");




app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', EjsMate);
app.use(express.static(path.join(__dirname, "public")));


// database connectivity
let port= 8080;
const dbUrl = process.env.ATLASDB_URL;

main()
.then((res)=>{
    console.log(res);
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

};


const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600
});

store.on("error",()=>{
   console.log("Error in mongo store", err);
});

const SessionOptions ={
    store,
    secret :process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    } 
};



app.use(Session(SessionOptions));
app.use(flash());

//configure authentication through passport
app.use(passport.initialize());
app.use(passport.session());
passport.use( new localStrategy(User.authenticate()));

//serialize (store) & deserialize(delete)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success =req.flash("success");
    res.locals.error =req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//home route
app.get("/",(req, res)=>{
    res.render("home"); // assuming req.user holds logged-in user
});

//listing router
app.use("/listings", listingsRoute);
//review router
app.use("/listings/:id/reviews", reviewsRoute);
//user route
app.use("/",userRoute);


app.get("/registerUser", async(req, res)=>{
    let fakeUser = new User({
        email:"student@gmail.com",
        username:"delta-studen",
    });
    let newUser = await User.register(fakeUser,"helloworld");
    res.send(newUser);
})


// Catch-all for unknown routes
app.use((req,res,next)=>{
   next(new ExpressError(404,"page not found"));
});


app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode).send(message);
});


app.listen(port,()=>{
    console.log(`server is  running : http://localhost:8080`);
});