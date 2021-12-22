const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt'); // Permet de chiffrer le mot de passe
const jwt = require('jsonwebtoken'); // Permet de créer et de vérifier un token d'authentification

// Récupération de tous les utilisateurs

exports.allUsers = async(req, res, next) => {
    let users = await prisma.user.findMany({
        select: {
            first_name: true,
            last_name: true,
            email: true,
            password: true,
        }
    })
    res.json(users)
};

// Enregistrement d'un utilisateur avec hash : FONCTIONNE 

exports.signup = async(req, res, next) => {
    const userExists = await prisma.user.findUnique({
        where: {
            email: 'email@mail.com2' 
        },
        select: {
            email: true
        }
    })

    if(userExists){
        return res.status(400).json({ message : 'Cet email existe déjà dans la base de données.'})
    }

    const hash = await bcrypt.hash('motdepasse2', 10);

    const newUser = await prisma.user.create({
        data: {
            first_name: 'Prénom2',
            last_name: 'Nom2',
            email: 'email@mail.com2',
            password: hash,
        },
    })
    res.json(newUser)
};

// Connection d'un utilisateur 

exports.login = async function login(req, res, next){
    const userExists = await prisma.user.findUnique({
        where: {
            email: 'email@mail.com2' //req.body.email
        },
        select: {
            email: true
        }
    })

    if(!userExists){
        return res.status(400).json({ message : 'Cet utilisateur n\'existe pas.'})
    }

    const valid = await bcrypt.compare('motdepasse2', '$2b$10$GLW/ngDIDJGihzzwSMRz/eeev4gk4oSLmUh32ylLIGK/EokfGnPvG') //(req.body.password, user.password)

    if(!valid){
        return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    res.status(200).json({
        userId: 5, //user.id
        token: jwt.sign(
            { userId: 5 }, //user.id
            process.env.TOKEN, 
            { expiresIn: '24h' }
        )
    });
};

// Suppression simple d'un utilisateur 

exports.delete = async(req, res, next) => {
    const userExists = await prisma.user.findUnique({
        where: {
            id: 2 // req.params.id
        },
        select: {
            id: true
        }
    })
    if(!userExists){
        return res.status(400).json({ message : 'Cet utilisateur n\'existe pas dans la base de données'})
    }

    const deleteUSer = await prisma.user.delete({
        where: {
            id: 2
        },
    })
    res.json(deleteUSer)
};

// Modification d'un utilisateur

exports.modifyUser = async(req, res, next) => {
    const userExists = await prisma.user.findUnique({
        where: {
            id: 5 // req.params.id
        },
        select: {
            password: true //req.params.password
        }
    })

    if(!userExists){
        return res.status(400).json({ message : 'Cet utilisateur n\'existe pas dans la base de données'})
    }

    const hash = await bcrypt.hash('password', 10);

    const newPassword = await prisma.user.update({
        where: {
            id: 5 //req.params.id
        },
        data: {
            password: hash
        }
    })

    res.json(newPassword)
};