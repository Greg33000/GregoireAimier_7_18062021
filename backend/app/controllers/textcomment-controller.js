const bdd = require("../models");
const RedditComment = bdd.redditComment;
const Reddit = bdd.redditPost;
const Op = bdd.Sequelize.Op;

exports.createComment = (req, res, next) => {
  // console.log(req.body)
  if (!req.body.description || !req.body.postId || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // console.log(req.body.postId)
  const comment = {
    postId: req.body.postId,
    description: req.body.description,
    username: req.body.username,
  };
  RedditComment.create(comment)
  .then(data => {
    res.send(data)

    // ICI on a rajouté la fonction pour mettre à jour le nb de comments pour un texte => Attention, pas de message d'erreur 
    var condition = data.postId ? { postId: { [Op.like]: `%${data.postId}%` } } : null ;
    RedditComment.findAll({ 
      where: condition,
      order: [
        ['id', 'DESC'],
      ], 
    })
    .then(value => {
      Reddit.update(
        {nbComments: value.length}, 
        {where: { id: data.postId }}
        )
        // .then(num => {
        //   console.log("NUM : " + num)
        //   if (num == 1) {
        //     res.status(200).json({ message: 'Objet enregistré !'})
        //   } else {
        //     res.send({
        //       message: `Cannot update Qty of comments`
        //     });
        //    }
        // })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Text post " 
          });
        })
       })
    })

    // .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  };

  

// Retrieve all Comments from the database.
exports.findAllComments = (req, res) => {
  const postId = req.params.postId;
  var condition = postId ? { postId: { [Op.like]: `%${postId}%` } } : null ;
  RedditComment.findAll({ 
    where: condition,
    order: [
      ['id', 'DESC'],
    ], 
  })
  .then(data => {res.send(data)})
  .catch(error => {res.status(500).send({ error });});
};

