const express = require("express");
const passport = require("passport");
const multer = require("multer");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const User = require("../models/users.js");
const { storage } = require("../cloudConfig.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const mongoose = require("mongoose");

const router = express.Router();
const upload = multer({ storage });

function publicUser(user) {
  if (!user) {
    return null;
  }
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    image: user.image,
  };
}

function listingInput(body) {
  if (body.listing && typeof body.listing === "object") {
    return body.listing;
  }
  const fields = ["title", "description", "price", "location", "country"];
  return Object.fromEntries(
    fields
      .filter((field) => body[`listing[${field}]`] !== undefined)
      .map((field) => [field, body[`listing[${field}]`]])
  );
}

function validateListingInput(listing) {
  const { error, value } = listingSchema.validate({ listing });
  if (error) {
    throw new ExpressError(400, error.details.map((item) => item.message).join(", "));
  }
  return value.listing;
}

async function requireUser(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Please log in to continue." });
  }
  return next();
}

async function getListingOrFail(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new ExpressError(404, "Listing not found.");
  }
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found.");
  }
  return listing;
}

router.get("/me", (req, res) => {
  res.json({ user: publicUser(req.user) });
});

router.post("/auth/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new ExpressError(400, "Username, email, and password are required.");
    }
    const user = await User.register(new User({ username, email }), password);
    req.login(user, (error) => {
      if (error) {
        return next(error);
      }
      return res.status(201).json({ user: publicUser(user) });
    });
  } catch (error) {
    if (error.name === "UserExistsError" || error.code === 11000) {
      return res.status(409).json({ error: "That username or email is already in use." });
    }
    return next(error);
  }
});

router.post("/auth/login", (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password." });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      return res.json({ user: publicUser(user) });
    });
  })(req, res, next);
});

router.post("/auth/logout", requireUser, (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    return res.json({ success: true });
  });
});

router.get("/listings", async (req, res) => {
  const listings = await Listing.find({})
    .populate("owner", "username")
    .sort({ _id: -1 });
  res.json({ listings });
});

router.get("/listings/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new ExpressError(404, "Listing not found.");
  }
  const listing = await Listing.findById(req.params.id)
    .populate("owner", "username")
    .populate({
      path: "reviews",
      populate: { path: "author", select: "username" },
    });
  if (!listing) {
    throw new ExpressError(404, "Listing not found.");
  }
  res.json({ listing });
});

router.post(
  "/listings",
  requireUser,
  upload.single("listing[image]"),
  async (req, res) => {
    const listingData = listingInput(req.body);
    const validListing = validateListingInput(listingData);
    if (!req.file) {
      throw new ExpressError(400, "Please choose an image for this listing.");
    }
    const listing = await Listing.create({
      ...validListing,
      owner: req.user._id,
      image: { url: req.file.path, filename: req.file.filename },
    });
    res.status(201).json({ listing });
  }
);

router.put(
  "/listings/:id",
  requireUser,
  upload.single("listing[image]"),
  async (req, res) => {
    const listing = await getListingOrFail(req.params.id);
    if (!listing.owner || !listing.owner.equals(req.user._id)) {
      throw new ExpressError(403, "Only the owner can edit this listing.");
    }
    const validListing = validateListingInput(listingInput(req.body));
    Object.assign(listing, validListing);
    if (req.file) {
      listing.image = { url: req.file.path, filename: req.file.filename };
    }
    await listing.save();
    res.json({ listing });
  }
);

router.delete("/listings/:id", requireUser, async (req, res) => {
  const listing = await getListingOrFail(req.params.id);
  if (!listing.owner || !listing.owner.equals(req.user._id)) {
    throw new ExpressError(403, "Only the owner can delete this listing.");
  }
  await Listing.findByIdAndDelete(listing._id);
  res.json({ success: true });
});

router.post("/listings/:id/reviews", requireUser, async (req, res) => {
  const listing = await getListingOrFail(req.params.id);
  const { error, value } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details.map((item) => item.message).join(", "));
  }
  const review = await Review.create({
    ...value.review,
    author: req.user._id,
  });
  listing.reviews.push(review._id);
  await listing.save();
  await review.populate("author", "username");
  res.status(201).json({ review });
});

router.delete(
  "/listings/:id/reviews/:reviewId",
  requireUser,
  async (req, res) => {
    const listing = await getListingOrFail(req.params.id);
    if (!mongoose.isValidObjectId(req.params.reviewId)) {
      throw new ExpressError(404, "Review not found.");
    }
    const review = await Review.findById(req.params.reviewId);
    if (!review || !listing.reviews.some((id) => id.equals(review._id))) {
      throw new ExpressError(404, "Review not found.");
    }
    if (!review.author || !review.author.equals(req.user._id)) {
      throw new ExpressError(403, "Only the review author can delete this review.");
    }
    listing.reviews.pull(review._id);
    await Promise.all([listing.save(), review.deleteOne()]);
    res.json({ success: true });
  }
);

module.exports = router;
