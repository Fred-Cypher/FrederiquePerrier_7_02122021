const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs'); // File system de Node pour interagir avec le système de fichiers du serveur

// Récupérer tous les messages 

exports.getAllMessages = async function allMessages(req, res, next){
    const allMessages = await prisma.message.findMany()
    res.send(JSON.stringify({"status": 200, "error": null, 'response': allMessages}));
};

// Récupérer un seul message 

exports.getOneMessage = async function oneMessage(req, res, next){
    // Vérification de la présence de l'id et de la forme de l'id du message
    let messageId = parseInt(req.params.id)

    if(!messageId){
        return res.status(400).json({ message: 'Ce message n\'existe pas'})
    }

    try{
        // Recherche du message dans la BDD
        const message = await prisma.message.findUnique({
            where: {
                id : Number(req.params.id) 
            }
        })

        if ( message === null ){
            return res.status(404).json({ message: 'Ce message n\'existe pas' })
        }

        return res.json({ data : message})
    }
    catch(err){
        return res.status(500).json({ message: 'Erreur lors de la connexion à la base de données'})
    }
};

// Récupérer les messages d'un seul utilisateur

exports.getMessageByUser = async(req, res, next) => {
    // Vérification de la présence de l'id et de la forme de l'id de l'utilisateur
    let userId = parseInt(req.params.id)

    if(!userId){
        return res.status(400).json({ message: 'Cet utilisateur n\'existe pas'})
    }

    try{
        // Rechercher tous les messages d'un utilisateur
        const userMessages = await prisma.message.findMany({
            where: {
                user_id : Number(req.params.id)
            }, select:{
                title: true,
                created_at: true,
                image_url: true,
                description: true
            }
        })
    res.json(userMessages)
    }
    catch(err){
        return res.status(500).json({ message: 'Erreur lors de la connexion à la base de données'})
    }
};

// Créer un message

exports.createMessage = async function createMessage(req, res, next){

    const { title, description, user_id, image_url } = req.body;

    if( !title || !description || !image_url ){
        return res.status(400).json({ message: 'Champs non remplis'})
    }

    try{
        // Recherche de l'utilisateur dans la BDD
        const userExists = await prisma.user.findUnique({
            where: {
                id: Number(user_id)
            }
        })

        if(!userExists){
            res.send(JSON.stringify({"status": 404, "error": 'L\'utilisateur n\'existe pas', "token": null}));
            return;
        }

        // Création et enregistrement du message dans la BDD
        const message = await prisma.message.create({
            data: {
                title: title,
                image_url: image_url,
                description: description, 
                user_id: user_id
            }
        })
        
        res.send(JSON.stringify({ 'status': 200, 'error': null, 'response': message}))
    }
    catch(e){
        res.send(JSON.stringify({"status" : 400, "error": 'Erreur lors de l\'enregistrement de l\'image', 'token': null}))
    }
};


// Modifier un message

exports.modifyMessage = async(req, res, next) => {
    // Vérification de la présence de l'id et de la forme de l'id du message
    let messageId = parseInt(req.params.id);

    if(!messageId){
        return res.status(400).json({ message: 'Ce message n\'existe pas'})
    }

    // Vérification de l'existence du message dans la BDD
    const messageExists = await prisma.message.findUnique({
        where: {
            id: Number(req.params.id) // 1
        },
        select: {
            id: true
        }
    }) 

    if(!messageExists){
        return res.status(400).json({ message : 'Ce message n\'existe pas' })
    }

    // Modification et enregistrement du message dans la BDD
    const changeMessage = await prisma.message.update({
        where: {
            id: Number(req.params.id) 
        },
        data: {
            title: req.body.title, 
            description: req.boby.description 
        }
    })
    res.json(changeMessage)
};

// Supprimer un message

exports.deleteMessage = async(req, res, next) => {
    // Vérification de l'existence du message
    const messageExists = await prisma.message.findUnique({
        where: {
            id: Number(req.params.id) 
        },
        select: {
            id: true
        }
    }) 

    if(!messageExists){
        return res.status(400).json({ message : 'Ce message n\'existe pas' })
    }

    // Suppression du message
    const deleteOneMessage = await prisma.message.delete({
        where: {
            id: Number(req.params.id) 
        }
    })
    res.json(deleteOneMessage)
};