module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "unique"
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "unique"
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    
  });

  return User;
};