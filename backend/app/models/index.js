const bddConfig = require("../config/bdd-config.js");

const Sequelize = require("sequelize");
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

bdd.textPost = require("./text-model.js")(sequelize, Sequelize);
bdd.textComment = require("./textcomment-model.js")(sequelize, Sequelize);
bdd.user = require("./user-model.js")(sequelize, Sequelize);
bdd.role = require("./role-model.js")(sequelize, Sequelize);

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



module.exports = bdd;