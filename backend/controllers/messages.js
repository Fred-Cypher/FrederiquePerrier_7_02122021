const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs'); // File system de Node pour interagir avec le système de fichiers du serveur


// Afficher tous les messages 

exports.getAllMessages = async(req, res, next) => {
    const messages = await prisma.message.findMany({
        select: {
            title: true,
            user: true,
            user_id: true,
            created_at: true,
            image_url: true,
            description: true
        }
    })
    res.json(messages)
};

// Afficher un seul message 

exports.getOneMessage = async(req, res, next) => {
    const oneMessage = await prisma.message.findUnique({
        where: {
            id : 1 //req.params.id
        }
    })
    res.json(oneMessage)
};

// Afficher les messages d'un seul utilisateur

exports.getMessageByUser = async(req, res, next) => {
    const userMessages = await prisma.message.findMany({
        where: {
            user_id : 5 // req.params.id
        }, select:{
            title: true,
            created_at: true,
            image_url: true,
            description: true
        }
    })
    res.json(userMessages)
};

// Créer un message

exports.createMessage = async(req, res, next) => {
    const newMessage = await prisma.message.create({
        data: {
            title: 'Message Marie',
            image_url: 'lien image Marie',
            //${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            description: 'Description Marie',
            user: {
                connect: {
                    id: 3
                }
            }
        }
    })
    res.json(newMessage)
};


// Modifier un message

exports.modifyMessage = async(req, res, next) => {
    const messageExists = await prisma.message.findUnique({
        where: {
            id: 1 //req.params.id
        },
        select: {
            id: true
        }
    }) 

    if(!messageExists){
        return res.status(400).json({ message : 'Ce message n\'existe pas' })
    }

    const changeMessage = await prisma.message.update({
        where: {
            id: 1 //req.params.id
        },
        data: {
            title: 'Changement titre', //req.body.title
            description: 'Changement description' //req.boby.descrition
        }
    })
    res.json(changeMessage)
};

// Supprimer un message

exports.deleteMessage = async(req, res, next) => {
    const messageExists = await prisma.message.findUnique({
        where: {
            id: 2 // req.params.id
        },
        select: {
            id: true
        }
    }) 

    if(!messageExists){
        return res.status(400).json({ message : 'Ce message n\'existe pas' })
    }

    const deleteOneMessage = await prisma.message.delete({
        where: {
            id: 2 // req.params.id
        }
    })
    res.json(deleteOneMessage)
};