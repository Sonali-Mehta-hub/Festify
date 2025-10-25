const sampleListings = [
  {
    title: "The Oberoi Udaivilas",
    description: "Lakefront luxury palace resort perfect for grand weddings and events.",
    image: { url: "https://www.oberoihotels.com/-/media/oberoi-hotel/udaivilas-resized/Udaivilas/dining/suryamahal-and-chandni/desktop820x646/1.jpg", filename: "oberoi-udaivilas.jpg" },
    price: 80000,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Taj Lake Palace",
    description: "Floating palace in Lake Pichola offering royal event experiences.",
    image: { url: "https://www.smlwindia.com/our-blog/wp-content/uploads/2019/05/2-3.jpg", filename: "taj-lake-palace.jpg" },
    price: 100000,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "City Palace Jaipur",
    description: "Historic palace venue in the Pink City for luxurious gatherings.",
    image: { url: "https://cdn.rajasthanstudio.com/wp-content/uploads/2022/03/1-1-1024x536.png", filename: "city-palace-jaipur.png" },
    price: 75000,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "Fairmont Jaipur",
    description: "A royal luxury hotel designed for premium weddings and corporate events.",
    image: { url: "https://m.ahstatic.com/is/image/accorhotels/aja_p_5819-30:4by3?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.5&wid=335&hei=251&qlt=80", filename: "fairmont-jaipur.jpg" },
    price: 60000,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "Umaid Bhawan Palace",
    description: "Iconic heritage palace in Jodhpur offering a regal event setting.",
    image: { url: "https://www.steppestravel.com/app/uploads/2019/06/umaid-bhawan-palace-jodhpur-india.jpg", filename: "umaid-bhawan-palace.jpg" },
    price: 120000,
    location: "Jodhpur",
    country: "India"
  },
  {
    title: "Rambagh Palace",
    description: "Taj luxury palace hotel with royal gardens and halls.",
    image: { url: "https://www.frette.com/on/demandware.static/-/Library-Sites-FretteSharedLibrary/default/dwb543e6b1/images/fretteus/hotels/2017/02%20-%20Taj%20Rambagh%20Palace/hotel-featurepage-herobanner-2017-02-mobile.jpg", filename: "rambagh-palace.jpg" },
    price: 95000,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "ITC Grand Chola",
    description: "Luxury convention and wedding hotel in South India.",
    image: { url: "https://i0.wp.com/madhuonthego.com/wp-content/uploads/2019/03/cover-pic-itc-grand-chola.png?fit=961%2C720&ssl=1", filename: "itc-grand-chola.png" },
    price: 70000,
    location: "Chennai",
    country: "India"
  },
  {
    title: "Hyatt Regency Delhi",
    description: "Business and social event hub in India’s capital.",
    image: { url: "https://www.weddingsutra.com/images/Vendor_Images/Venues/hyatt-regency-delhi/hyatt-regency-delhi-07.jpg", filename: "hyatt-regency-delhi.jpg" },
    price: 50000,
    location: "Delhi",
    country: "India"
  },
  
  {
    title: "Jio World Convention Centre",
    description: "Modern large-scale convention and concert venue.",
    image: { url: "https://www.archidust.com/blog/wp-content/uploads/2024/12/1-1-1-jpg.webp", filename: "jio-world-convention.jpg" },
    price: 100000,
    location: "Mumbai",
    country: "India"
  },
  {
    title: "Ramoji Film City",
    description: "The world’s largest film city also doubles as a huge event space.",
    image: { url: "https://gallery-rfc.s3.ap-south-1.amazonaws.com/packages-rfc/30663Packages.jpg", filename: "ramoji-film-city.jpg" },
    price: 65000,
    location: "Hyderabad",
    country: "India"
  },
  
  {
    title: "ITC Royal Bengal",
    description: "Luxurious hotel and event space in Eastern India.",
    image: { url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/604155459.jpg?k=b3840036ac52cffbb4c18842b0a6af2fe151f87f19bdbc0b365ac617ffb32c7b&o=&hp=1", filename: "itc-royal-bengal.jpg" },
    price: 70000,
    location: "Kolkata",
    country: "India"
  },
  {
    title: "Fernhills Palace",
    description: "Heritage palace in the Nilgiris, perfect for destination events.",
    image: { url: "https://www.welcomheritagehotels.in/app/uploaded_files/hotel_gallery/mobile/WH%20Ferrnhills%20Royale%20Palace,%20Ooty9427.jpg", filename: "fernhills-palace.jpg" },
    price: 50000,
    location: "Ooty",
    country: "India"
  },
  {
    title: "Lalgarh Palace",
    description: "Royal palace in Bikaner for weddings and heritage stays.",
    image: { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/b8/a6/b0/palace-exteriors.jpg?w=1200&h=-1&s=1", filename: "lalgarh-palace.jpg" },
    price: 65000,
    location: "Bikaner",
    country: "India"
  },
  {
    title: "Madison Square Garden",
    description: "World-famous arena for concerts and mega events.",
    image: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Madison_Square_Garden_%28MSG%29_-_Full_%2848124330357%29.jpg/1200px-Madison_Square_Garden_%28MSG%29_-_Full_%2848124330357%29.jpg", filename: "madison-square-garden.jpg" },
    price: 200000,
    location: "New York",
    country: "USA"
  },
  {
    title: "The O2 Arena",
    description: "Iconic multi-purpose indoor arena in London.",
    image: { url: "https://static.goout.cloud/coloursselectioncz/2021/07/O2-arena-Prague-1.jpg", filename: "o2-arena-london.jpg" },
    price: 180000,
    location: "London",
    country: "UK"
  },
  {
    title: "Sydney Opera House",
    description: "Global landmark and premier performing arts center.",
    image: { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/93/a7/be/sydney-opera-house.jpg?w=900&h=500&s=1", filename: "sydney-opera-house.jpg" },
    price: 22000,
    location: "Sydney",
    country: "Australia"
  },
  {
    title: "Marina Bay Sands",
    description: "Futuristic luxury hotel and event hub.",
    image: { url: "https://dynamic-media.tacdn.com/media/photo-o/2f/ab/87/26/caption.jpg?w=700&h=500&s=1", filename: "marina-bay-sands.jpg" },
    price: 240000,
    location: "Singapore",
    country: "Singapore"
  },
  {
    title: "Burj Al Arab",
    description: "The iconic sail-shaped hotel for luxury events.",
    image: { url: "https://cdn.enjoytravel.com/img/Big7Enjoy/en/travel-news/interesting-facts/interesting-facts-the-burj-al-arab-hotel/its_record_breaking.webp", filename: "burj-al-arab.webp" },
    price: 30000,
    location: "Dubai",
    country: "UAE"
  },
  {
    title: "Atlantis The Palm",
    description: "Massive resort with luxury event spaces on Palm Jumeirah.",
    image: { url: "https://az712897.vo.msecnd.net/images/full/5f45f384-8c9c-40fb-8e9e-8c4e24b60d0e.jpeg", filename: "atlantis-the-palm.jpeg" },
    price: 28000,
    location: "Dubai",
    country: "UAE"
  },
  {
    title: "Palais des Festivals",
    description: "Famous Cannes venue known for film and luxury events.",
    image: { url: "https://media.istockphoto.com/id/1298966301/photo/exterior-view-of-palais-des-festivals-cannes-south-of-france.jpg?s=612x612&w=0&k=20&c=VqBC2KzmXMMc2oXZQNH9qUJ1gDHTKcqItzkxNy93Q_g=", filename: "palais-des-festivals.jpg" },
    price: 260000,
    location: "Cannes",
    country: "France"
  },
  
  {
    title: "Bellagio Hotel",
    description: "Iconic Las Vegas resort for luxury weddings and events.",
    image: { url: "https://tensorflight.com/wp-content/uploads/2023/09/Las_Vegas_September_2018_-_30883305428-1024x768.jpg", filename: "bellagio-hotel.jpg" },
    price: 220000,
    location: "Las Vegas",
    country: "USA"
  },
  {
    title: "Caesars Palace",
    description: "Legendary Las Vegas venue for concerts and luxury weddings.",
    image: { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/f1/41/a6/welcome-to-caesars-palace.jpg?w=900&h=500&s=1", filename: "caesars-palace.jpg" },
    price: 210000,
    location: "Las Vegas",
    country: "USA"
  },
  {
    title: "Fira Barcelona",
    description: "Modern international trade fair and event space.",
    image: { url: "https://expotravelsolutions.com/images/venues/4_Fira_Barcelona_Gran_Via.jpg", filename: "fira-barcelona.jpg" },
    price: 230000,
    location: "Barcelona",
    country: "Spain"
  },
  {
    title: "Arena di Verona",
    description: "Ancient Roman amphitheater hosting grand concerts.",
    image: { url: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=450,height=450,dpr=2/tour_img/dfe6d367034492a6.jpeg", filename: "arena-di-verona.jpg" },
    price: 240000,
    location: "Verona",
    country: "Italy"
  },
  {
    title: "Tokyo Dome",
    description: "Japan’s iconic arena for sports, concerts, and global events.",
    image: { url: "https://en.japantravel.com/photo/poi-181-209938/1200x630/tokyo-tokyo-dome-city-209938.jpg", filename: "tokyo-dome.jpg" },
    price: 250000,
    location: "Tokyo",
    country: "Japan"
  },
  {
    title: "Mercedes-Benz Arena",
    description: "World-class event arena in Berlin.",
    image: { url: "https://images.adsttc.com/media/images/5a0e/f16f/b22e/382f/e000/00ed/medium_jpg/Falcon-133.jpg?1510928732", filename: "mercedes-benz-arena.jpg" },
    price: 190000,
    location: "Berlin",
    country: "Germany"
  }
];

module.exports = { sampleListings };
