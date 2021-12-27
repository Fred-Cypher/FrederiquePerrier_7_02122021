const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Enregistrer un commentaire OK

exports.createComment = async(req, res, next) => {
    const newComment = await prisma.comment.create({
        data:{
            commentary : 'Commentaire de Marie',
            user: {
                connect: {
                    id: 3 //user_id
                },
            },
            image_post: {
                connect: {
                    id: 4 //image_id
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
            image_id: 3 //req.params.id
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
            user_id: 3 //req.params.id
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
            id: 5 //req.params.id
        }
    })
    res.json(oneComment)
};

// Modifier un commentaire A FAIRE PAR MODO

exports.modifyComment = async(req, res, next) => {
    const commentExists = await prisma.comment.findUnique({
        where: {
            id: 3 //req.params.id
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
            id: 3
        },
        data: {
            commentary: 'Changement commentaire 2' //req.body.commentary
        }
    })
    res.json(changeComment)
};

// Supprimer un commentaire

exports.deleteComment = async(req, res, next) => {
    const commentExists = await prisma.comment.findUnique({
        where: {
            id: 4 //req.params.id
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
            id: 4 // req.params.id
        }
    })
    res.json(deleteOneComment)
};