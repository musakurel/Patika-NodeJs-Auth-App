const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view enginea
app.set("view engine", "ejs");

// database connection

mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB Connected"))
  .then((result) =>
    app.listen(3000, () => {
      console.log(`Server listening on port 3000`);
    })
  )
  .catch((err) => console.log(err));


// routes
//Read All Users
let newArr=[]
User.find({}, (err, user) => {
  newArr = user;
});
console.log(newArr);

app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard", { newArr: newArr });
});
app.use(authRoutes);
