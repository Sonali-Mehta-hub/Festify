const  Listing = require("../models/listing");
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//indexroute controller
module.exports.index = async (req, res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index",{allListings});
};

//newroute controller
module.exports.renderNewForm = (req, res)=>{
    res.render("listings/new");
};

//showRoute controller
module.exports.showListings = async (req, res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist !");
         return res.redirect("/listings");    
    }
    // console.log(listing);
    res.render("listings/show",{listing});
};

//createRoute controller
module.exports.createListings = async(req, res, next)=>{
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing= new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url,filename};
        let savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success", "New listing created !");
        res.redirect("/listings");
    
};

//editRoute controller
module.exports.editListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;

    // ✅ Only apply Cloudinary transformation if the image is from Cloudinary
    if (originalImageUrl && originalImageUrl.includes("res.cloudinary.com")) {
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_150");
    }

    res.render("listings/edit", { listing, originalImageUrl });
};


//updateRoute controller
module.exports.updateListings = async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing})// ... is used for reconstruction
     if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image  = {url,filename};
        await listing.save();
     }
    req.flash("success", "Listing update !");
    res.redirect(`/listings/${id}`);
};

//deleteRoute controller
module.exports.deleteListings = async (req, res)=>{
    let {id} = req.params;
    const deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};