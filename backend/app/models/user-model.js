module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "unique_tag"
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return User;
};