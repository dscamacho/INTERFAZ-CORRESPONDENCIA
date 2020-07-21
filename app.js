const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('views', 'public/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/usersDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = {
  tipoID: String,
  numeroID: String,
  nombre: String,
  celContacto: String,
  telContacto: String,
  dirContacto: String,
  email: String
};

const User = mongoose.model("User", userSchema);

app.route("/")

.get(function(req, res){
  res.render("index");
  User.find(function(err, foundUsers){
    if (!err) {
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

  const newUser = new User({
    tipoID: req.body.tipoID,
    numeroID: req.body.numeroID,
    nombre: req.body.nombre,
    celContacto: req.body.celContacto,
    telContacto: req.body.telContacto,
    dirContacto: req.body.dirContacto,
    email: req.body.email
  });

  newUser.save(function(err){
    if (!err){
      res.send("Successfully added a new User.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){

  User.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all Users.");
    } else {
      res.send(err);
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
