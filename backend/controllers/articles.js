const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Récupérer tous les articles 

exports.getAllArticles = async function getAllArticles(req, res, next){
    const allArticles = await prisma.article.findMany()
    res.send(JSON.stringify({"status": 200, "error": null, 'response': allArticles}));
};

// Récupérer un seul article 

exports.getOneArticle = async function oneArticle(req, res, next){
    // Vérification de la présence de l'id et de la forme de l'id de l'article
    let articleId = parseInt(req.params.id)

    if(!articleId){
        return res.status(400).json({ message: 'Cet article n\'existe pas'})
    }

    // Récupération de l'article dans la BDD 
    try{
        const oneArticle = await prisma.article.findUnique({
            where: {
                id : Number(articleId)
            }
        })

        if(oneArticle === null){
            return res.status(404).json({ message: 'Cet article n\'existe pas'})
        }

        return res.json({ data : oneArticle })
    }
    catch(err){
        return res.status(500).json({ message: 'Erreur lors de la connexion avec la base de données'})
    }
};

// Récupérer les articles d'un seul utilisateur : à revoir

exports.getArticleByUser = async(req, res, next) => {
    const userArticles = await prisma.article.findMany({
        where: {
            user_id : Number(req.params.id)
        }, select: {
            title: true,
            created_at: true,
            image_url: true,
            description: true
        }
    })
    res.json(userArticles)
};

// Créer un article

exports.createArticle = async function createArticle(req, res, next){

    const { title, summary, content, user_id } = req.body;

    try{
        // Vérification de la présence de l'utilisateur dans la BDD
        const userExists = await prisma.user.findUnique({
            where: {
                id: Number(user_id)
            }
        })

        if(!userExists){
            res.send(JSON.stringify({"status": 404, "error": 'Cet utilisateur n\'existe pas', "token": null}));
            return;
        }

        // Création et ajout de l'article dans la BDD
        const article = await prisma.article.create({
            data: {
                title: title,
                summary: summary,
                content: content,
                user_id: user_id,
                }
            }
        )
        console.log('const article du back', article)
        res.send(JSON.stringify({ 'status': 200, 'error': null, 'response': article}))
    }
    catch(e){
        res.send(JSON.stringify({"status" : 500, "error": 'Impossible d\'envoyer les données', 'token': null}))
    }
};


// Modifier un article

exports.modifyArticle = async(req, res, next) => {
    // Vérification de la présence de l'id et de la forme de l'id de l'article
    let articleId = parseInt(req.params.id);

    if(!articleId){
        return res.status(400).json({ message: 'Paramètres inconnus'})
    }

    // Modification de l'article dans la BDD
    try{
        // Recherche de l'article dans la BDD
        const article = await prisma.article.findUnique({
            where: {
                id: Number(req.params.id)
            },
            select: {
                title : true,
                summary: true,
                content: true
            }
        })

        if(!article){
            return res.status(400).json({ message : 'Cet article n\'existe pas' })
        }

        // Modification de l'article
        const modifiedArticle = await prisma.article.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: req.body.title,
                summary: req.boby.summary,
                content: req.body.content
            }
        })
        res.send(JSON.stringify({"status": 200, "error": null, "response": modifiedArticle}))
    }   
    catch(err){
        return res.status(500).json({ message: 'Erreur lors de la connexion à la base de données' })
    }
};

// Supprimer un article

exports.deleteArticle = async(req, res, next) => {
    // Vérification de la présence de l'article dans la BDD
    const articleExists = await prisma.article.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id: true
        }
    }) 

    if(!articleExists){
        return res.status(400).json({ message : 'Cet article n\'existe pas' })
    }

    // Suppression de l'article dans la BDD
    const deleteOneArticle = await prisma.article.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json(deleteOneArticle)
};