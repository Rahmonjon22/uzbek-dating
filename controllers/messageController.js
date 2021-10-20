const Message = require("../models/message.js");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

mongoose.connect("mongodb+srv://OnlineDatingApp:Asaka6264@cluster0.9yhv3.mongodb.net/collection-MMJ?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function () {
  console.log("Database connected");
});

router.get("/get-data", (req, res) => {
  Message.find()
    .lean()
    .then((docs) => {
      res.render("about", { items: docs });
    });
});

router.post("/insert", (req, res) => {
  const item = new Message({
    fullname: req.body.fullname,
    email: req.body.email,
    message: req.body.message,
  });

  item.save();
  res.redirect("/about");
});

router.post("/update", (req, res) => {
  const id = req.body.id;

  const query = Message.findOne({ _id: id }).then((doc) => {
    const item = {
      fullname: req.body.fullname || doc.fullname,
      email: req.body.email || doc.email,
      message: req.body.message || doc.message,
    };

    Message.updateOne({ _id: id }, { $set: item }, () => {
      console.log("Item updated");
    }).catch((error) => {
      console.log("Error", error);
    });
    res.redirect("/about");
  });
});

router.post("/delete", (req, res) => {
  const id = req.body.id;
  Message.deleteOne({ _id: id }, () => {
    console.log("item deleted");
  });
  res.redirect("/about");
});

module.exports = router;