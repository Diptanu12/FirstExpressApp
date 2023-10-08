const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
// data base store
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/diptanuContactFrom", {
  useNewUrlParser: true,
});
const port = 80;

//define mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    gender: String,
    dob: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    desc: String,
  });
const Contact = mongoose.model("Contact", contactSchema);

// For serving static files
app.use('/static', express.static('static'))

app.use(express.urlencoded({ extended: true }));
// Set the template engine as pug
app.set('view engine', 'pug')

// Set the view directory
app.set('views', path.join(__dirname, 'view'))

// ENDPOINTS
app.get("/", (req, res) => {
    const params = {};
    res.status(200).render("home.pug", params);
  });

app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render("contact.pug", params);
  });
app.get("/about", (req, res) => {
    const params = {};
    res.status(200).render("about.pug", params);
  });

  app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData
      .save()
      .then(() => {
        res.send("This Details saved in the database");
      })
      .catch((error) => {
          console.error(error);
          res.status(400).send("Details was not saved to the database");
        });
 
  });


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});