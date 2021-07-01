module.exports = (sequelize, Sequelize) => {
    const Reddit = sequelize.define("redditPosts", {
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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return Reddit;
  };