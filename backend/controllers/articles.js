const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Afficher tous les articles 

exports.getAllArticles = async function getAllArticles(req, res, next){
    const allArticles = await prisma.article.findMany()
    res.send(JSON.stringify({"status": 200, "error": null, 'response': allArticles}));
};

// Afficher un seul article 

exports.getOneArticle = async function oneArticle(req, res, next){
    const oneArticle = await prisma.article.findUnique({
        where: {
            id : Number(req.params.id) // 1 
        }
    })
    res.send(JSON.stringify({"status": 200, "error": null, "response": oneArticle}));
};

// Afficher les articles d'un seul utilisateur

exports.getArticleByUser = async(req, res, next) => {
    const userArticles = await prisma.article.findMany({
        where: {
            user_id : Number(req.params.id) // 5
        }, select:{
            title: true,
            created_at: true,
            image_url: true,
            description: true
        }
    })
    res.json(userArticles)
};

// Créer un article

exports.createArticle = async(req, res, next) => {
    /*console.log('req.body.title', req.body.title);
    console.log('req.body.description', req.body.description);
    console.log('req.body', req.body);*/

    try{
        const userExists = await prisma.article.findUnique({
            where: {
                id: Number(req.params.id)
            }, select: {
                id: true
            }
        })
            if(!userExists){
                res.send(JSON.stringify({"status": 404, "error": 'Cet utilisateur n\'existe pas', "token": null}));
                return;
            }

        try{
            const article = await prisma.article.create({
                data: {
                    title: req.body.title,//'Etudes',
                    description: req.boby.description,//'Les études, ça fatigue', 
                    user: {
                        connect: {
                            id:   user_id //2
                        }
                    }
                }
            })
            console.log('const article du back', article)
            res.send(JSON.stringify({ 'status': 200, 'error': null, 'response': article.id}))
        }
        catch(e){
            res.send(JSON.stringify({"status" : 400, "error": 'Erreur lors de l\'enregistrement de l\'image', 'token': null}))
        }
    }
    
    catch(e){
        res.send(JSON.stringify({"status" : 500, "error": 'Impossible de récupérer les données', 'token': null}))
    }
};


// Modifier un article

exports.modifyArticle = async(req, res, next) => {
    const articleExists = await prisma.article.findUnique({
        where: {
            id: req.params.id // 1
        },
        select: {
            id: true
        }
    }) 

    if(!articleExists){
        return res.status(400).json({ message : 'Cet article n\'existe pas' })
    }

    const changeArticle = await prisma.article.update({
        where: {
            id: req.params.id  // 1
        },
        data: {
            title: req.body.title, // 'Changement titre'
            description: req.boby.description // 'Changement description' 
        }
    })
    res.json(changeArticle)
};

// Supprimer un article

exports.deleteArticle = async(req, res, next) => {
    const articleExists = await prisma.article.findUnique({
        where: {
            id: req.params.id // 2
        },
        select: {
            id: true
        }
    }) 

    if(!articleExists){
        return res.status(400).json({ message : 'Cet article n\'existe pas' })
    }

    const deleteOneArticle = await prisma.article.delete({
        where: {
            id: req.params.id // 2
        }
    })
    res.json(deleteOneArticle)
};