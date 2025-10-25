const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
.then((res)=>{
    console.log(res);
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    const dataWithOwner = initData.sampleListings.map(obj => ({
    ...obj,
    owner: "68dd195203e336e06fbc18d2" // whatever owner you want to assign
   }));

    await Listing.insertMany(dataWithOwner);
    console.log("data was initialized with owner field");
};


initDB();

