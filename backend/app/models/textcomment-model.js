module.exports = (sequelize, Sequelize) => {
    const TextComments = sequelize.define("textComments", {
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      textPostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return TextComments;
  };