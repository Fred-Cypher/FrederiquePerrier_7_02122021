const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/articles');

router.get('/', auth, articleCtrl.getAllArticles); 
router.post('/', auth, articleCtrl.createArticle);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.get('/:id/:user_id', auth, articleCtrl.getArticleByUser);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.put('/:id', auth, articleCtrl.modifyArticle);

module.exports = router;