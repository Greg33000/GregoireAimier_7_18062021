const bdd = require("../models");
const Text = bdd.textPost;
const Op = bdd.Sequelize.Op;
const fs = require('fs');

// Create a new text.
exports.create = (req, res, next) => {
  const parseBody = JSON.parse(req.body.post)
  
  if (!parseBody.title || !parseBody.description || !parseBody.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var text = {};
  if (req.file != null) { // verify if there is a file
    text = {
        title: parseBody.title,
        description: parseBody.description,
        imageUrl: `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}`,
        username: parseBody.username,
        nbComments: 0,
      };
  } else {
    text = {
        title: parseBody.title,
        description: parseBody.description,
        username: parseBody.username,
        nbComments: 0,
      };
  
  }
  
  Text.create(text)
    .then(data => {res.send(data)})
    .catch(error => res.status(400).json({ error }));
  };



// Retrieve all text Post from the database with or without req.query.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const username = req.query.username;
  var condition1 = title ? { title: { [Op.like]: `%${title}%` } } : null ;
  var condition2 = username ? { username: { [Op.like]: `%${username}%` } } : null;
  Text.findAll({ 
    where: {[Op.and]: [condition1, condition2]},
    order: [
      ['id', 'DESC'],
    ], 
  })
  .then(data => {res.send(data)})
  .catch(error => {res.status(500).send({ error });});
};


// Find a single text post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Text.findByPk(id)
    .then(data => {res.send(data);})
    .catch(err => {
      err.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    });
};


// Update a Text post by the id in the request
exports.updateText = (req, res) => {

  const id = req.params.id;
  const parseBody = JSON.parse(req.body.post)
  // Inputs verification
  if (!parseBody.title || !parseBody.description ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  var text = {};
  var imgToDelete = false;
  if (parseBody.editImage == "delete") { // verifiy if the image would be deleted on the database
    text = {
      title: parseBody.title,
      description: parseBody.description,
      imageUrl: null,
    };
    imgToDelete = true

  } else 
  if (req.file != null) { // verifiy if there is a new image. If yes, put the new url in database
    text = {
      title: parseBody.title,
      description: parseBody.description,
      imageUrl: `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}`,
    };
    imgToDelete = true
  } else { // Here is that there is not a new file : the previous image is kept
    text = {
      title: parseBody.title,
      description: parseBody.description,
    };
  }
 
  // Find the text with id to get the name of file to unlink it if available 
  Text.findByPk(id)
  .then(data => {
    var unlinkFilename = null

    if (data.imageUrl != null && imgToDelete == true ) {
      const filename = data.imageUrl.split('/images/')[1];
      var unlinkFilename = `app//images/${filename}`
    } else {
      var unlinkFilename = ``
    }
    fs.unlink(unlinkFilename, () => {

      Text.update(text, {
        where: { id: id }
      })

      .then(() => {res.send({message: "Text was updated."})})
      .catch(error => res.status(400).json({ error }))
    });
  })
  .catch(error => res.status(500).json({ error }));
};

// Delete text-post with the specified id in the request and unlink the image if available
exports.deleteText = (req, res) => {
  const id = req.params.id;
  Text.findByPk(id)
  .then(data => {
    var unlinkFilename = null
    if (data.imageUrl != null) {
      const filename = data.imageUrl.split('/images/')[1];
      var unlinkFilename = `app//images/${filename}`
    } else {
      var unlinkFilename = ``
    }
    fs.unlink(unlinkFilename, () => {
      Text.destroy({
        where: { id: id }
      })
      .then(() => {res.send({message: "Text was deleted."})})
      .catch(error => res.status(400).json({ error }))
    });
  })
  .catch(error => res.status(500).json({ error }));
};

