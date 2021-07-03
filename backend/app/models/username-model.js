module.exports = (sequelize, Sequelize) => {
    const Username = sequelize.define("usernames", {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "unique_tag"
      }
    });
  
    return Username;
  };