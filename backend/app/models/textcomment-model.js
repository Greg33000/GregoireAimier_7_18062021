module.exports = (sequelize, Sequelize) => {
    const RedditComments = sequelize.define("redditComments", {
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return RedditComments;
  };