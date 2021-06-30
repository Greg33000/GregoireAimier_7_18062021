module.exports = (sequelize, Sequelize) => {
    const Reddit = sequelize.define("redditPosts", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      }
    });
  
    return Reddit;
  };