module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "unique"
    },
    emailH: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "unique"
    },
    emailC: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    
  });

  return User;
};