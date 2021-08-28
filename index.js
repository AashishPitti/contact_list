const express = require("express");
const path = require("path");
const port = 7000;

const db = require("./config/mongoose");
const Contact = require("./model/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assests"));

// //middleware1
// app.use(function (req, res, next) {
//   req.myName = "Aashsih";
//   next();
// });

// //middleware2
// app.use(function (req, res, next) {
//   console.log(req.myName);
//   next();
// });

var contactList = [
  {
    name: "Aashish",
    phone: "1234567890",
  },

  {
    name: "Mayank",
    phone: "7894562330",
  },

  {
    name: "Jatin",
    phone: "4567891230",
  },
];

app.get("/", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Err");
      return;
    }
    return res.render("home", { title: "Hello!!", contact_list: contacts });
  });
  // return res.render("home", { title: "Hello!!", contact_list: contacts });
});

app.get("/practice", (req, res) => {
  return res.render("practice", { title: "Let us Play" });
});

app.post("/create_contact", (req, res) => {
  // contactList.push(req.body);

  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone,
  // });
  // return res.redirect("/");

  // to come same page after render we use
  // return res.redirect("back");

  //Created contact and added to database
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newcontact) {
      if (err) {
        console.log("Err");
        return;
      }
      console.log("******", newcontact);
      return res.redirect("back");
    }
  );
});

app.get("/delete-contact/", function (req, res) {
  console.log(req.query);

  // let phone = req.params.phone;

  //we can also use query instead of params
  let id = req.query.id;

  // //to find index
  // let contactindex = contactList.findIndex((contact) => contact.phone == phone);

  // if (contactindex != -1) {
  //   contactList.splice(contactindex, 1);
  // }

  //find the contact in db and delete it
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("err");
      return;
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Err", err);
    return;
  }
  console.log("Port:", port);
});
