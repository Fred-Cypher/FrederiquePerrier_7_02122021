const express = require('express');
const router = express.Router();

const checkToken = require('../middleware/check');

const articleCtrl = require('../controllers/articles');

router.get('/', checkToken, articleCtrl.getAllArticles); 
router.put('/', checkToken, articleCtrl.createArticle);
router.get('/:id', checkToken, articleCtrl.getOneArticle);
router.get('/:id/:user_id', checkToken, articleCtrl.getArticleByUser);
router.delete('/:id', checkToken, articleCtrl.deleteArticle);
router.patch('/:id', checkToken, articleCtrl.modifyArticle);

module.exports = router;