const express = require('express');
const multer = require('../middleware/multer-config');

const router = express.Router();

const messageCtrl = require('../controllers/messages');

router.get('/', messageCtrl.getAllMessages); 
router.post('/', messageCtrl.createMessage);
router.get('/:id', messageCtrl.getOneMessage);
router.get('/:id/:user_id', messageCtrl.getMessageByUser);
router.delete('/:id', messageCtrl.deleteMessage);
router.put('/:id', messageCtrl.modifyMessage);

module.exports = router;