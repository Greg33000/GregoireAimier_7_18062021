const express = require('express');
const helmet = require("helmet");

// Management of environment variables
const dotenv = require("dotenv");
dotenv.config();


const textRoutes = require('./app/routes/text-routes');
const textCommentsRoutes = require('./app/routes/textcomment-routes');
const userRoutes = require('./app/routes/user-routes');
const path = require('path');

const app = express();


// CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Helmet : connect-style middleware for security
app.use(helmet());

 
// parse application/json => deprecated. Express do it from version 4.16+
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data


// management of image ressource in static mode
app.use('/app/images', express.static(path.join(__dirname, 'app/images')));

// routes 
app.use('/api/texts', textRoutes);
app.use('/api/textcomments', textCommentsRoutes);
app.use('/api/auth', userRoutes);


// Synchronization with the database
const bdd = require("./app/models");
bdd.sequelize.sync();



module.exports = app;