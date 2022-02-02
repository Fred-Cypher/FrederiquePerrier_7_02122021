const express = require('express');
const router = express.Router();

const checkToken = require('../middleware/check');

const articleCtrl = require('../controllers/articles');

router.get('/', articleCtrl.getAllArticles); 
router.post('/', checkToken, articleCtrl.createArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.get('/:id/:user_id', checkToken, articleCtrl.getArticleByUser);
router.delete('/:id', checkToken, articleCtrl.deleteArticle);
router.put('/:id', checkToken, articleCtrl.modifyArticle);

module.exports = router;