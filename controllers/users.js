const User = require("../models/users");

//render signUp form 
module.exports.rengerSignUp = (req, res)=>{
    res.render("users/signup.ejs");
};

//signup 
module .exports.signup = async (req,res)=>{
    try{

        let {username, email, password} =req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to Wanderlust !");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};

//render login form 
module.exports.renderLogin = (req, res)=>{
    res.render("users/login.ejs");
};

//login
module.exports.login = (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        // ✅ Safe redirect (fallback to /listings if nothing saved)
        const redirectUrl = res.locals.redirectUrl || "/listings";
        delete req.session.redirectUrl;  // clear after using it
        res.redirect(redirectUrl);
    };

//logout 
module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out !");
        res.redirect("/listings");
    });
};

