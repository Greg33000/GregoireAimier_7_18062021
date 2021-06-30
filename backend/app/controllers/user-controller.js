const bcrypt = require('bcrypt');
const bdd = require("../models");
const User = bdd.user;
const Role = bdd.role;
const jwt = require('jsonwebtoken');
const config = require("../config/auth-config.js");
const Op = bdd.Sequelize.Op;
// const cryptoJS = require("crypto-js");

exports.signup = (req, res, next) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                // email: cryptoJS.SHA1(req.body.email).toString(),
                email: req.body.email,
                password: hash
            };
            User.create(user)
            // .then(data => {res.send(data);})
            //   .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
            
            .then(data => {
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    }).then(roles => {
                        data.setRoles(roles)
                        .then(() => {
                            res.send({ message: "User was registered successfully!" });
                        });
                    });
                } else {
                  // user role = 1
                    data.setRoles([1])
                    .then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                }
            })
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
        
    


// exports.signup = (req, res) => {
 
    
//     // Save User to Database
//     User.create({
//         email: req.body.email,
//         password: req.body.password
//         // password: bcrypt.hashSync(req.body.password, 10)
//     })
//         .then(user => {
//             // user role = 1
//             user.setRoles([1]).then(() => {
//                 res.send({ message: "User was registered successfully!" });
//             });
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message });
//         });
// };

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = {
//                 // email: cryptoJS.SHA1(req.body.email).toString(),
//                 email: req.body.email,
//                 password: hash
//             };
//             User.create(user)
//                 .then(data => {res.send(data);})
//                 // .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//                 .catch(error => res.status(400).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));
// };

exports.login = (req, res, next) => {
    // User.findOne({ email: cryptoJS.SHA1(req.body.email).toString() }) // utilisation de crypto JS pour le cryptage des email 
    // User.findOne({ email: req.body.email }) // utilisation de crypto JS pour le cryptage des email 
    //     .then(user => {
    //         if (!user) {
    //             return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    //         }
    //         bcrypt.compare(req.body.password, user.password)
    //         .then(valid => {
    //             if (!valid) {
    //                 return res.status(401).json({ error: 'Mot de passe incorrect !' });
    //             }
    //             res.status(200).json({
    //                 userId: user._id,
    //                 token: jwt.sign(
    //                     { userId: user._id, userRole: 'admin' },
    //                     config.secret,
    //                     { expiresIn: '24h' }
    //                 )
    //             });
    //         })
    //         .catch(error => res.status(500).json({ error }));
    //     })
    //     .catch(error => res.status(500).json({ error }));
};