const express = require('express');
const router = express.Router();

const checkToken = require('../middleware/check');
const multer = require('../middleware/multer-config');

const messageCtrl = require('../controllers/messages');

router.get('/', messageCtrl.getAllMessages); 
router.post('/', checkToken, multer, messageCtrl.createMessage);
router.get('/:id', messageCtrl.getOneMessage);
router.get('/:id/:user_id', checkToken, messageCtrl.getMessageByUser);
router.delete('/:id', checkToken, messageCtrl.deleteMessage);
router.put('/:id', checkToken, messageCtrl.modifyMessage);

module.exports = router;