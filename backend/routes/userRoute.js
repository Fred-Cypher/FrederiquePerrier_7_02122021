const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt'); // Permet de chiffrer le mot de passe

const userCtrl = require('../controllers/usersController');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.deleteAccount);

module.exports = router;