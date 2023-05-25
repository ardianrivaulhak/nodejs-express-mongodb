const User = require('../models/user.model');

exports.allAccess = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getUser = (req, res) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const content = {
        user: user,
      };

      res.status(200).json(content);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.userBoard = (req, res) => {
  const content = {
    message: 'User Content',
  };

  res.status(200).json(content);
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};
