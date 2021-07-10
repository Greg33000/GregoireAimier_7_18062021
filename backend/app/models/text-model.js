module.exports = (sequelize, Sequelize) => {
    const Text = sequelize.define("textPosts", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nbComments: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return Text;
  };