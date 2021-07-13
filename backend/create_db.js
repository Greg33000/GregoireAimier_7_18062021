// Management of environment variables
const dotenv = require("dotenv");
dotenv.config();


const bddConfig = require("./app/config/bdd-config.js");
const Sequelize = require("sequelize");


// connection to "host" to create database
const sequelizeCreateDB = new Sequelize("", bddConfig.USER, bddConfig.PASSWORD, {
  host: bddConfig.HOST,
  dialect: bddConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: bddConfig.pool.max,
    min: bddConfig.pool.min,
    acquire: bddConfig.pool.acquire,
    idle: bddConfig.pool.idle
  }
});

// connection to the database to create tables and fill it
const sequelize = new Sequelize(bddConfig.DB, bddConfig.USER, bddConfig.PASSWORD, {
  host: bddConfig.HOST,
  dialect: bddConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: bddConfig.pool.max,
    min: bddConfig.pool.min,
    acquire: bddConfig.pool.acquire,
    idle: bddConfig.pool.idle
  }
});

const bdd = {};
bdd.Sequelize = Sequelize;
bdd.sequelize = sequelize;
  
bdd.textPost = require("./app/models/text-model.js")(sequelize, Sequelize);
bdd.textComment = require("./app/models/textcomment-model.js")(sequelize, Sequelize);
bdd.user = require("./app/models/user-model.js")(sequelize, Sequelize);
bdd.role = require("./app/models/role-model.js")(sequelize, Sequelize);
  
bdd.role.belongsToMany(bdd.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
bdd.user.belongsToMany(bdd.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
  
bdd.textPost.hasMany(bdd.textComment,{
  foreignKey: "textPostId",
});
bdd.textComment.belongsTo(bdd.textPost);
  

// Creation of the database and when done, create tables and fill it
sequelizeCreateDB.query("CREATE DATABASE " + bddConfig.DB + ";")
.then( () => {
  
  bdd.sequelize.sync({ force: true }).then(() => {
    initial();
  });

})

// filling the tables
function initial() {

  // roles filling
  bdd.role.create({id: 1, name: "user"});
  bdd.role.create({id: 2, name: "moderator"});
  bdd.role.create({id: 3, name: "admin"});

  // texts and comments filling
  bdd.textPost.create({
    title: "La france éliminée de l'euro...", 
    description: "DESCRIPTION_2", 
    imageUrl: null, 
    username: "user2", 
    nbComments: 1
  })
  .then(data => {
    bdd.textComment.create({textPostId: data.id, username: "user1", description: "Trop la loose, je venais d'acheter le maillot avec les 2 étoiles..."});
  });

  bdd.textPost.create({
    title: "Premier test Covid-19, France 1553.", 
    description: "MDR", 
    imageUrl: "http://localhost:3000/app/images/chevaliers.jpg1626086837375.jpg", 
    username: "user3", 
    nbComments: 0
  });

  bdd.textPost.create({
    title: "Victoire de l'Italie à l'EURO 2020 !", 
    description: "A la santé des italiens !", 
    imageUrl: "http://localhost:3000/app/images/tchin.jpg1626085758487.jpg", 
    username: "user1", 
    nbComments: 3
  })
  .then(data => {
    bdd.textComment.create({textPostId: data.id, username: "user2", description: "En plus aux tirs aux buts..."});
    bdd.textComment.create({textPostId: data.id, username: "user1", description: "C'est clair, c'était un match de fou !"});
    bdd.textComment.create({textPostId: data.id, username: "user3", description: "Dommage pour les anglais qui méritaient quand même la victoire :("});
  });

  bdd.textPost.create({
    title: "Statistiques sur l’épidémie de COVID-19 en France - 12/07/2021", 
    description: "Ca grimpe...", 
    imageUrl: "http://localhost:3000/app/images/epidemie.png1626087711628.png", 
    username: "user2", 
    nbComments: 2
  })
  .then(data => {
    bdd.textComment.create({textPostId: data.id, username: "user1", description: "Ca va être compliqué pour partir en vacances :/"});
    bdd.textComment.create({textPostId: data.id, username: "user3", description: "je suis trop deg"});

  });
  

  

  // user filling and set role
  bdd.user.create({username: "user1", email: "7043be4de9abf54f13af31ea561fcc53f33a75e0", password: "$2b$10$ELC/PH5WILKfB2tfzxCSYeYKeojdGwrDRSRHd87L7WeB2S/lkaYKa"})
  .then(data => {
    data.setRoles([1]);
  })
 
  bdd.user.create({username: "user2", email: "e098bf7d1542080fd55ba736735b394253e2afdd", password: "$2b$10$P7GbRs3UY.qoh.SQNmU8I.A9KCLAJQcb0DFtF/Jjxg4L55EWAwH0i"})
  .then(data => {
    data.setRoles([1]);
  })

  bdd.user.create({username: "user3", email: "252f589f0fd19e992b166000ca476b1016d1b5a1", password: "$2b$10$npDLVqzRgDn5ilO2bZfLwOZ1veJCLhPy/e6KDZW3BBzi877vFezMy"})
  .then(data => {
    data.setRoles([1]);
  })

  bdd.user.create({username: "moderator", email: "a0935a902817a36eb11d56c46f80cf58a5c448fe", password: "$2b$10$HrrWngk5L5qewi3ErI3o3uz8FRZ40j/ytyWxmSSDV/ri5/441sdOu"})
  .then(data => {
    data.setRoles([2]);
  })

  


}

