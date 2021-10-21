const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");
mongoose.connect("mongodb://localhost:27017/project-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60af441c8725ea4330b809b3",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae temporibus, pariatur vel consectetur error sapiente sint minus accusantium magni, maiores exercitationem ullam veniam ipsum, distinctio ut? Mollitia quis officia obcaecati!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dq77chlkd/image/upload/v1634554107/ProjectCamp/odahnag6avjic2vjjfdp.jpg",
          filename: "ProjectCamp/odahnag6avjic2vjjfdp",
        },
        {
          url: "https://res.cloudinary.com/dq77chlkd/image/upload/v1634554112/ProjectCamp/mj7xstvnqgy1enupnyfu.jpg",
          filename: "ProjectCamp/mj7xstvnqgy1enupnyfu",
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
