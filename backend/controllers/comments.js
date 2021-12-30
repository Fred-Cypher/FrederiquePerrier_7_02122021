const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Enregistrer un commentaire OK

exports.createComment = async(req, res, next) => {
    const newComment = await prisma.comment.create({
        data:{
            commentary : req.body.commentary, // 'Commentaire de Marie',
            user: {
                connect: {
                    id: user_id // 3
                },
            },
            image_post: {
                connect: {
                    id: image_id // 4
                }
            }
        }
    })
    res.json(newComment)
};

// Afficher tous les commentaires d'un message 

exports.getCommentsByMessage = async(req, res, next) => {
    const messageComments = await prisma.comment.findMany({
        where: {
            image_id: req.params.id // 3
        }, select: {
            commentary: true,
            created_at: true
        }
        })
    res.json(messageComments)
};

// Afficher les commentaires d'un seul utilisateur 

exports.getCommentsByUser = async(req, res, next) => {
    const userComments = await prisma.comment.findMany({
        where: {
            user_id: req.params.id // 3 
        }, select: {
            commentary: true,
            created_at: true
        }
    })
    res.json(userComments)
};

// Afficher un seul commentaire OK

exports.getOneComment = async(req, res, next) => {
    const oneComment = await prisma.comment.findUnique({
        where: {
            id: req.params.id // 5 
        }
    })
    res.json(oneComment)
};

// Modifier un commentaire A FAIRE PAR MODO

exports.modifyComment = async(req, res, next) => {
    const commentExists = await prisma.comment.findUnique({
        where: {
            id: req.params.id // 3
        }, 
        select: {
            id: true
        }
    })

    if(!commentExists){
        return res.status(400).json({ message : 'Ce commentaire n\'existe pas'})
    }

    const changeComment = await prisma.comment.update({
        where: {
            id: req.params.id //3
        },
        data: {
            commentary: req.body.commentary // 'Changement commentaire 2'
        }
    })
    res.json(changeComment)
};

// Supprimer un commentaire

exports.deleteComment = async(req, res, next) => {
    const commentExists = await prisma.comment.findUnique({
        where: {
            id: req.params.id // 4
        },
        select: {
            id :true
        }
    })

    if(!commentExists){
        return res.status(400).json({ message: 'Ce commentaire n\'existe pas'})
    }

    const deleteOneComment = await prisma.comment.delete({
        where: {
            id: req.params.id // 4
        }
    })
    res.json(deleteOneComment)
};