const express = require('express');

const router = express.Router();

const commentCtrl = require('../controllers/comments');

router.post('/', commentCtrl.createComment);
router.get('/:id', commentCtrl.getOneComment);
router.delete('/:id', commentCtrl.deleteComment);
router.put('/:id', commentCtrl.modifyComment);
router.get('/:id/:user_id', commentCtrl.getCommentsByUser);
router.get('/:id/:image_id', commentCtrl.getCommentsByMessage);

module.exports = router; 