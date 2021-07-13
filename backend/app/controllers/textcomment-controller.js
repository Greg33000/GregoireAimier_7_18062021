const bdd = require("../models");
const TextComment = bdd.textComment;
const Text = bdd.textPost;
const Op = bdd.Sequelize.Op;

// create a comment with body information 
exports.createComment = (req, res, next) => {
  if (!req.body.description || !req.body.textPostId || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const comment = {
    textPostId: req.body.textPostId,
    description: req.body.description,
    username: req.body.username,
  };
  TextComment.create(comment)
  .then(data => {
    res.send(data)

    // Here, we add a function witch update the number of comments for an id text when creating the comment 
    var condition = data.textPostId ? { textPostId: { [Op.like]: `%${data.textPostId}%` } } : null ;
    TextComment.findAll({ 
      where: condition,
      order: [
        ['id', 'DESC'],
      ], 
    })
    .then(value => {
      Text.update(
        {nbComments: value.length}, 
        {where: { id: data.textPostId }}
        )

        .catch(err => {
          res.status(500).send({
            message: "Error updating Text post " 
          });
        })
       })
    })
  .catch(error => res.status(400).json({ error }));
};


// Find all comments with a specific text Id
exports.findAllComments = (req, res) => {
  const textPostId = req.params.postId;
  var condition = textPostId ? { textPostId: { [Op.like]: `%${textPostId}%` } } : null ;
  TextComment.findAll({ 
    where: condition,
    order: [
      ['id', 'DESC'],
    ], 
  })
  .then(data => {res.send(data)})
  .catch(error => {res.status(500).send({ error });});
};

// Delete a comment woth specific id (only for moderator)
exports.deleteComment = (req, res) => {
  const id = req.params.id;

// Find the id text for the comment  
TextComment.findByPk(id)
  .then(data => {
    TextComment.destroy({
      where: { id: id }
    })
    .then(() => {
      res.send(data)
  
      // Here, we add a function witch update the number of comments for an id text when deleting the comment 
      var condition = data.textPostId ? { textPostId: { [Op.like]: `%${data.textPostId}%` } } : null ;
      TextComment.findAll({ 
        where: condition,
        order: [
          ['id', 'DESC'],
        ], 
      })
      .then(value => {
        Text.update(
          {nbComments: value.length}, 
          {where: { id: data.textPostId }}
        )
        .catch(err => {
          err.status(500).send({
            message: "Error updating Text post " 
          });
        })
      })
    })
    .catch(error => res.status(400).json({ error }))
  })
  .catch(err => {
    err.status(500).send({
      message: "Error retrieving Comment with id=" + id
    });
  });
};


// modify a comment with specific id
exports.updateComment = (req, res) => {
  if (!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  const id = req.params.id;

  TextComment.update(
    {description: req.body.description}, 
    {where: { id: id }}
  )
  .then(() => {res.send({message: "Text was deleted."})})
  .catch( () => {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id
    });
  });
};
