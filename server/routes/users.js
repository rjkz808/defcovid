const express = require('express');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.get('/:id', UsersController.getUserById);
router.post('/', UsersController.createUser);

module.exports = router;
