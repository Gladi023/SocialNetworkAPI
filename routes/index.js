const router = require('express').Router();

const User = require('../models/User');

//router.use('/', htmlRoutes);

router.get('/api/users',(req, res) => {
  User.find()
    .then(users => {
      res.status(200).json({users, message: 'users route'})
    })
});

module.exports = router;
