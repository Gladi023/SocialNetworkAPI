const router = require('express').Router();

const User = require('../models/User');

//router.use('/', htmlRoutes);

router.get('/api/users',(req, res) => {
  User.find()
    .then(users => {
      res.status(200).json({users, message: 'users route'})
    })
});
router.post('/api/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(user => {
      res.status(201).json({user, message: 'New user created'});
    })
    .catch(err => {
      res.status(500).json({err, message: 'Error creating new user'});
    });
    router.put('/api/users/:id', (req, res) => {
      User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(user => {
          if (!user) {
            return res.status(404).json({message: 'User not found'});
          }
          res.status(200).json({user, message: 'User updated'});
        })
        .catch(err => {
          res.status(500).json({err, message: 'Error updating user'});
        });
    });
});
router.delete('/api/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }
      res.status(200).json({user, message: 'User deleted'});
    })
    .catch(err => {
      res.status(500).json({err, message: 'Error deleting user'});
    });
});

module.exports = router;
