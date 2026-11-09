require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const apiRoutes = require("./routes/api.js");

const app = express();
const dbUrl = process.env.ATLASDB_URL;
const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});
sessionStore.on("error", (error) => {
  console.error("MongoDB session store error:", error);
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

passport.use(new LocalStrategy(User.authenticate()));
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        (isProduction
          ? "https://festify-fx0n.onrender.com/auth/google/callback"
          : "http://localhost:5173/auth/google/callback"),
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(new Error("Google account did not provide an email"));
          }

          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email,
            image: profile.photos?.[0]?.value,
            username: profile.displayName || email.split("@")[0],
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    done(null, await User.findById(id));
  } catch (error) {
    done(error);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => res.redirect("/listings")
);

app.use("/api", apiRoutes);
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API endpoint not found." });
});

const clientDist = path.join(__dirname, "client", "dist");
app.use(express.static(clientDist));
app.use((req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }
  res.sendFile(path.join(clientDist, "index.html"), (error) => {
    if (error) {
      next(error);
    }
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const status = error.statusCode || error.status || 500;
  if (req.path.startsWith("/api")) {
    return res.status(status).json({
      error: status >= 500 ? "Something went wrong" : error.message,
    });
  }
  return res.status(status).send(error.message || "Something went wrong");
});

async function start() {
  if (!dbUrl || !process.env.SECRET) {
    throw new Error("ATLASDB_URL and SECRET must be set in the environment.");
  }
  await mongoose.connect(dbUrl);
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Festify server listening on port ${port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error("Failed to start Festify:", error);
    process.exitCode = 1;
  });
}

module.exports = app;
