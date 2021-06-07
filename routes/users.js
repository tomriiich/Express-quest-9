// Create the router object that will manage all operations on movies
const usersRouter = require('express').Router();
// Import the movie model that we'll need in controller functions
const User = require('../models/user');

// GET /api/movies/
usersRouter.get('/', (req, res) => {
  const { language } = req.query;
  User.findMany({ filters: { language } })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving users from database');
    });
});

usersRouter.get('/:id', (req, res) => {
    User.findOne(req.params.id)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).send('User not found');
        }
      })
      .catch((err) => {
        res.status(500).send('Error retrieving user from database');
      });
  });

// Don't forget to export the router in order to link it to the app in routes/index.js
module.exports = usersRouter;