const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/users');

router.get('/', userCtrl.allUsers);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.delete);
router.put('/:id', userCtrl.modifyUser);

module.exports = router; 