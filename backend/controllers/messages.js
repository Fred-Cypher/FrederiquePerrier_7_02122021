const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs'); // File system de Node pour interagir avec le système de fichiers du serveur


// Afficher tous les messages 

exports.getAllMessages = async function allMessages(req, res, next){
    const allMessages = await prisma.message.findMany()
    res.send(JSON.stringify({"status": 200, "error": null, 'response': allMessages}));
};

// Afficher un seul message 

exports.getOneMessage = async function oneMessage(req, res, next){
    const oneMessage = await prisma.message.findUnique({
        where: {
            id : Number(req.params.id) // 1 
        }
    })
    res.send(JSON.stringify({"status": 200, "error": null, "response": oneMessage}));
};

// Afficher les messages d'un seul utilisateur

exports.getMessageByUser = async(req, res, next) => {
    const userMessages = await prisma.message.findMany({
        where: {
            user_id : Number(req.params.id) // 5
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

exports.createMessage = async function newMessage(req, res, next){
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body);
    try{
        const message = await prisma.message.create({
            data: {
                title: req.body.title,
                image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                description: req.boby.description, 
                user: {
                    connect: {
                        id: user_id 
                    }
                }
            }
        })
        console.log('const message du back', message)
        res.send(JSON.stringify({ 'status': 200, 'error': null, 'response': message.id}))
    }
    catch(e){
        res.send(JSON.stringify({"status" : 404, "error": 'Erreur lors de l\'enregistrement de l\'image', 'token': null}))
    }
};


// Modifier un message

exports.modifyMessage = async(req, res, next) => {
    const messageExists = await prisma.message.findUnique({
        where: {
            id: req.params.id // 1
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
            id: req.params.id  // 1
        },
        data: {
            title: req.body.title, // 'Changement titre'
            description: req.boby.description // 'Changement description' 
        }
    })
    res.json(changeMessage)
};

// Supprimer un message

exports.deleteMessage = async(req, res, next) => {
    const messageExists = await prisma.message.findUnique({
        where: {
            id: req.params.id // 2
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
            id: req.params.id // 2
        }
    })
    res.json(deleteOneMessage)
};