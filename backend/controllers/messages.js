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

    let messageId = parseInt(req.params.id)

    if(!messageId){
        return res.status(400).json({ message: 'Ce message n\'existe pas'})
    }

    try{
        const message = await prisma.message.findUnique({
        where: {
            id : Number(req.params.id) 
        }
    })

    if ( message === null){
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

    let userId = parseInt(req.params.id)

    if(!userId){
        return res.status(400).json({ message: 'Cet utilisateur n\'existe pas'})
    }

    try{
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
    /*console.log('req.body.title', req.body.title);
    console.log('req.body.description', req.body.description);
    console.log('req.body', req.body);*/

    const { title, description, user_id, image_url } = req.body;

    //const image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    console.log(req.body)

    /*if(!title || !description || !image_url ){
        return res.status(400).json({ message: 'Champs non remplis'})
    }*/

    try{
        const userExists = await prisma.user.findUnique({
            where: {
                id: Number(user_id)
            }
        })

        console.log('user exists : ', userExists)

        if(!userExists){
            res.send(JSON.stringify({"status": 404, "error": 'L\'utilisateur n\'existe pas', "token": null}));
            return;
        }

        const message = await prisma.message.create({
            data: {
                title: title,
                image_url: image_url,
                description: description, 
                user_id: user_id
                }
            }
        )
        
        console.log('const message du back', message)
        res.send(JSON.stringify({ 'status': 200, 'error': null, 'response': message}))
    }
    catch(e){
        res.send(JSON.stringify({"status" : 400, "error": 'Erreur lors de l\'enregistrement de l\'image', 'token': null}))
    }
};


// Modifier un message

exports.modifyMessage = async(req, res, next) => {

    let messageId = parseInt(req.params.id);



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

    const deleteOneMessage = await prisma.message.delete({
        where: {
            id: req.params.id 
        }
    })
    res.json(deleteOneMessage)
};