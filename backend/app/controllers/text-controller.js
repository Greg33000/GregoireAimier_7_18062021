const bdd = require("../models");
const Reddit = bdd.redditPost;
const Op = bdd.Sequelize.Op;

exports.create = (req, res, next) => {
  // Validate request
  // delete options.headers['Content-Type'];
  const parseBody = JSON.parse(req.body.post)
  console.log(parseBody)
  // console.log(req.get("post"))
  
  if (!parseBody.title || !parseBody.description || !parseBody.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // /console.log(req.file);
  var reddit = {};
  if (req.file != null) {
    reddit = {
        title: parseBody.title,
        description: parseBody.description,
        imageUrl: `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}`,
        username: parseBody.username,
        nbComments: 0,
      };
  } else {
    reddit = {
        title: parseBody.title,
        description: parseBody.description,
        username: parseBody.username,
        nbComments: 0,
      };
  
  }
  
  Reddit.create(reddit)
    .then(data => {res.send(data)})
    // .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  };



// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const username = req.query.username;
  var condition1 = title ? { title: { [Op.like]: `%${title}%` } } : null ;
  var condition2 = username ? { username: { [Op.like]: `%${username}%` } } : null;
  Reddit.findAll({ 
    where: {[Op.and]: [condition1, condition2]},
    order: [
      ['id', 'DESC'],
    ], 
  })
  .then(data => {res.send(data)})
  .catch(error => {res.status(500).send({ error });});
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Reddit.findByPk(id)
    .then(data => {res.send(data);})
    .catch(err => {
      err.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    });
};


// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
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
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

