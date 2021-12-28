const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const messageCtrl = require('../controllers/messages');

router.get('/', auth, messageCtrl.getAllMessages); 
router.post('/', auth, multer, messageCtrl.createMessage);
router.get('/:id', auth, messageCtrl.getOneMessage);
router.get('/:id/:user_id', auth, messageCtrl.getMessageByUser);
router.delete('/:id', auth, messageCtrl.deleteMessage);
router.put('/:id', auth, messageCtrl.modifyMessage);

module.exports = router;