const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comments');

router.post('/', auth, commentCtrl.createComment);
router.get('/:id',auth, commentCtrl.getOneComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router.get('/:id/:user_id', auth, commentCtrl.getCommentsByUser);
router.get('/:id/:image_id', auth, commentCtrl.getCommentsByMessage);

module.exports = router; 