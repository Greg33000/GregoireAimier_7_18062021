const express = require('express');

// const helmet = require("helmet");
// require('dotenv').config();
const redditRoutes = require('./app/routes/reddit-routes');
const userRoutes = require('./app/routes/user-routes');
// const path = require('path');

const app = express();


// CORS (ports différents entre backend et frontend)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Helmet : connect-style middleware for security
// app.use(helmet());

 
// parse application/json => deprecated. Express le fait depuis la version 4.16+
app.use(express.json())


// pour gérer la ressource image de manière statique
// app.use('/images', express.static(path.join(__dirname, 'images')));

// routes 
app.use('/api/reddit', redditRoutes);
app.use('/api/auth', userRoutes);

// test fonctionnement
// app.get("/", (req, res) => {
//   res.json({ message: "Test du fonctionnement backend" });
// });

const bdd = require("./app/models");
const Role = bdd.role;
// bdd.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initial();
// });

bdd.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

module.exports = app;