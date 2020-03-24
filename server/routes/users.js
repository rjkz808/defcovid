const express = require('express');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.get('/:id', UsersController.getUserById);
router.post('/', UsersController.createUser);
router.put('/points/:id', UsersController.updatePoints);

module.exports = router;
