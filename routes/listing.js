const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const flash = require("connect-flash");
const {isLoggedIn,validateListing,isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});





//index route & create route
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(listingController.createListings)
);




//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

// show route and update route, delete route
router.route("/:id")
.get(wrapAsync(listingController.showListings))
.put(isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
     wrapAsync(listingController.updateListings))
.delete( isLoggedIn,isOwner,wrapAsync(listingController.deleteListings));

// edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListings));


module.exports = router;