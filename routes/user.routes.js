const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/users', authenticate, authorize("admin"), userController.getUsers);

module.exports = router;
