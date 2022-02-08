const express = require('express');
const checkToken = require('../middleware/check');

const router = express.Router();

const userCtrl = require('../controllers/users');

router.get('/', checkToken, userCtrl.allUsers);
router.get('/:id', checkToken, userCtrl.onUser);
//router.get('/refresh', userCtrl.refreshToken);
router.put('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', checkToken, userCtrl.delete);
router.patch('/:id', checkToken, userCtrl.modifyUser);

module.exports = router; 