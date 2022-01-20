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
    try{
        const userExists = await prisma.user.findUnique({
            where: {
                email: String(req.body.email)
            }, select: {
                email: true
            }
        })
        if(userExists){
            res.send(JSON.stringify({"status": 404, "error": 'Cet utilisateur existe déjà dans la base de données', "token": null}));
            return;
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        try{
            const user = await prisma.user.create({
                data: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hash
                },
            })
            console.log('user : ', user)
            res.send(JSON.stringify({'status': 200, "error": null, "response": user.id}))
        }
        catch(e){
            res.send(JSON.stringify({"status" : 404, "error": 'Erreur lors de l\'enregistrement de l\'utilisateur', 'token': null}))
        }
    }
    catch(e){
        res.send(JSON.stringify({"status" : 500, "error": 'Requête non authentifiée', 'token': null}))
    }
};

// Connection d'un utilisateur 

exports.login = async function login(req, res, next){
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: String(req.body.email) //'email@mail.com2' 
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                password: true
            }
        });

        console.log('user : ', user);

        if(!user){
            res.send(JSON.stringify({"status" : 400, "error": 'Cet utilisateur n\'existe pas.', 'token': null}));
            return;
        } else {
            try{
            const valid = await bcrypt.compare(req.body.password, user.password) //('motdepasse2', '$2b$10$GLW/ngDIDJGihzzwSMRz/eeev4gk4oSLmUh32ylLIGK/EokfGnPvG')

            console.log('valid : ', valid);
            console.log('req.body.password : ', req.body.password);
            console.log('user.password : ', user.password);
            console.log('user.id : ', user.id)

            if(!valid){
                res.send(JSON.stringify({"status" : 404, "error": 'Mot de passe incorrect', 'token': null}))
                return;
            }

            const token = jwt.sign({
                userId: user.id},
                process.env.TOKEN, 
                { expiresIn: '24h' }
            );
            
            res.send(JSON.stringify({"status": 200, "error": null, "token": token, "email": user.email, "id": user.id, "first_name": user.first_name, "last_name": user.last_name}))
            }
            catch(e){
                res.send(JSON.stringify({"status" : 401, "error": 'Problème lors de l\'authentification', 'token': null}))
            }
        }
    }
    catch(e){
        res.send(JSON.stringify({"status" : 401, "error": 'Problème lors de la connection', 'token': null}))
    }
    
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