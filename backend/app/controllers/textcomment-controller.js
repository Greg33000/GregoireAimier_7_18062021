const bdd = require("../models");
const TextComment = bdd.textComment;
const Text = bdd.textPost;
const Op = bdd.Sequelize.Op;

exports.createComment = (req, res, next) => {
  // console.log(req.body)
  if (!req.body.description || !req.body.textPostId || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // console.log(req.body.textPostId)
  const comment = {
    textPostId: req.body.textPostId,
    description: req.body.description,
    username: req.body.username,
  };
  TextComment.create(comment)
  .then(data => {
    res.send(data)

    // ICI on a rajouté la fonction pour mettre à jour le nb de comments pour un texte => Attention, pas de message d'erreur 
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

  

// Retrieve all Comments from the database.
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

// Delete a comment (for Moderator role) with the specified id in the request
exports.deleteComment = (req, res) => {
  const id = req.params.id;

// Récupérer le commentaire pour connaitre l'id du post 


TextComment.findByPk(id)
  .then(data => {
    TextComment.destroy({
      where: { id: id }
    })
    .then(() => {
      res.send(data)
  
      // ICI on a rajouté la fonction pour mettre à jour le nb de comments pour un texte => Attention, pas de message d'erreur 
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




// modifie un commentaire avec un id donné
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
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch( () => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
