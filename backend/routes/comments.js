const express = require('express');

const router = express.Router();

const checkToken = require('../middleware/check')

const commentCtrl = require('../controllers/comments');

router.post('/', checkToken, commentCtrl.createComment);
router.get('/:id', checkToken, commentCtrl.getOneComment);
router.delete('/:id',checkToken,  commentCtrl.deleteComment);
router.put('/:id', checkToken, commentCtrl.modifyComment);
router.get('/:id/:user_id', checkToken, commentCtrl.getCommentsByUser);
router.get('/:id/:image_id', checkToken, commentCtrl.getCommentsByMessage);

module.exports = router; 