const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');


router.post('/registration',userController.register);
router.get('/all',userController.getUsers);
router.get('/login',userController.login);

module.exports = router;