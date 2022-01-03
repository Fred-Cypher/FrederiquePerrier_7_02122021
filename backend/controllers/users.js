const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt'); // Permet de chiffrer le mot de passe
const jwt = require('jsonwebtoken'); // Permet de créer et de vérifier un token d'authentification

// Récupération de tous les utilisateurs

exports.allUsers = async function allUser(req, res, next){
    const allUsers = await prisma.user.findMany()
    res.send(JSON.stringify({"status": 200, "error": null, 'response': allUsers}));
};

// Enregistrement d'un utilisateur avec hash  

exports.signup = async function signup(req, res, next){
    try
    {
        const user = await prisma.user.findUnique({
            where: { 
                email: req.body.email 
            }
        })
        console.log('user:', user);

        if(user)
        {
            res.send(JSON.stringify({'status': 302, "error": 'Cet email existe déjà dans la base de données'}));
            return;
        } else {
            let passwordHash = bcrypt.hash(req.body.password, 10);
            try 
            {
                console.log('password:', passwordHash);
                const user = await prisma.user.create({
                    data: {
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email: req.body.email,
                        password: passwordHash
                    }
                })
                res.send(JSON.stringify({'status': 200, 'error': null, 'response': user.id}));
            }
            catch(e)
            {
                res.send(JSON.stringify({'status': 500, 'error': 'In create user '+e, 'response': null}));
            }
        }
        
    }
    catch(e)
        {
            res.send(JSON.stringify({'status': 501, 'error': 'In user '+e, 'response': null}));
        }
};


// Connection d'un utilisateur 

exports.login = async function login(req, res, next){
    const userExists = await prisma.user.findUnique({
        where: {
            email: req.body.email //'email@mail.com2' 
        },
        select: {
            email: true
        }
    })

    if(!userExists){
        return res.status(400).json({ message : 'Cet utilisateur n\'existe pas.'})
    }

    const valid = await bcrypt.compare(req.body.password, user.password) //('motdepasse2', '$2b$10$GLW/ngDIDJGihzzwSMRz/eeev4gk4oSLmUh32ylLIGK/EokfGnPvG')

    if(!valid){
        return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    res.status(200).json({
        userId: user.id, // 5
        token: jwt.sign(
            { userId: user.id }, // 5
            process.env.TOKEN, 
            { expiresIn: '24h' }
        )
    });
};

// Suppression simple d'un utilisateur 

exports.delete = async(req, res, next) => {
    const userExists = await prisma.user.findUnique({
        where: {
            id: req.params.id // 2
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
            id: req.params.id // 2
        },
    })
    res.json(deleteUSer)
};

// Modification d'un utilisateur

exports.modifyUser = async(req, res, next) => {
    const userExists = await prisma.user.findUnique({
        where: {
            id: req.params.id // 5
        },
        select: {
            password: true 
        }
    })

    if(!userExists){
        return res.status(400).json({ message : 'Cet utilisateur n\'existe pas dans la base de données'})
    }

    const hash = await bcrypt.hash(req.body.password, 10); // 'password'

    const newPassword = await prisma.user.update({
        where: {
            id: req.params.id  // 5
        },
        data: {
            password: hash
        }
    })

    res.json(newPassword)
};