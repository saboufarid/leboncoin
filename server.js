require("dotenv").config;

// Le package `mongoose` est un ODM (Object-Document Mapping) permettant de
// manipuler les documents de la base de données comme si c'étaient des objets
var mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) console.error("Could not connect to mongodb.");
  }
);

var express = require("express");
var router = express.Router();
const path = require("path");
var app = express();

// Le package `helmet` est une collection de protections contre certaines
// vulnérabilités HTTP
var helmet = require("helmet");
app.use(helmet());

// Les réponses (> 1024 bytes) du serveur seront compressées au format GZIP pour
// diminuer la quantité d'informations transmise
var compression = require("compression");
app.use(compression());

// Parse le `body` des requêtes HTTP reçues
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" })); // L'upload est fixée à 50mb maximum (pour l'envoi de fichiers)

// Initialisation des models
var User = require("./models/User");

// app.get("/", function(req, res) {
//   res.send("Welcome to the leboncoin API.");
// });

// `Cross-Origin Resource Sharing` est un mechanisme permettant d'autoriser les
// requêtes provenant d'un nom de domaine different Ici, nous autorisons l'API
// à repondre aux requêtes AJAX venant d'autres serveurs
var cors = require("cors");
app.use("/api", cors());

// Les routes sont séparées dans plusieurs fichiers
// var coreRoutes = require("./routes/core.js");
// var userRoutes = require("./routes/user.js");
// var offerRoutes = require("./routes/offer.js");

// Les routes relatives aux utilisateurs auront pour prefix d'URL `/user`
// app.use("/api", coreRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/offer", offerRoutes);

app.use(require("./routes"));

// Serve up static assets (usually on heroku)
// router.use(
//   express.static("client/build", {
//     index: false
//   })
// );

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API or static HTML routes before this runs!
// router.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

// Toutes les méthodes HTTP (GET, POST, etc.) des pages non trouvées afficheront
// une erreur 404
// app.all("*", function(req, res) {
//   res.status(404).json({ error: "Not Found" });
// });

// Le dernier middleware de la chaîne gérera les d'erreurs Ce `error handler`
// doit définir obligatoirement 4 paramètres Définition d'un middleware :
// https://expressjs.com/en/guide/writing-middleware.html
app.use(function(err, req, res, next) {
  if (res.statusCode === 200) res.status(400);
  console.error(err);

  // if (process.env.NODE_ENV === "production") err = "An error occurred";
  res.json({ error: err });
});

app.listen(process.env.PORT, function() {
  console.log(`leboncoin API running on port ${process.env.PORT}`);
  console.log(`Current environment is ${process.env.NODE_ENV}`);
});
