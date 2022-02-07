const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt'); // Permet de chiffrer le mot de passe
const jwt = require('jsonwebtoken'); // Permet de créer et de vérifier un token d'authentification

// Récupération de tous les utilisateurs

exports.allUsers = async function allUser(req, res, next){
    const allUsers = await prisma.user.findMany()
    res.send(JSON.stringify({"status": 200, "error": null, 'response': allUsers}));
};

// Récupération d'un utilisateur

exports.onUser = async function oneUser(req, res, next){
    // Vérification de la présence et de la forme de l'id de l'utilisateur
    let userId = parseInt(req.params.id)

    if(!userId){
        return res.status(400).json({ message: 'Cet utilisateur n\'existe pas'})
    }

    // Récupération de l'utilisateur
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        })

        if ( user === null){
            return res.status(404).json({ message: 'Cet utilisateur n\'existe pas'})
        }

        return res.json({ data: user})

    }
    catch(err){
        return res.status(500).json({ message: 'Erreur lors de la connexion avec la base de données'})
    }
};

// Enregistrement d'un utilisateur avec hash  

exports.signup = async function signup(req, res, next){
    
    const { first_name, last_name, email, password} = req.body;

    // Vérification que tous les chmaps sont remplis
    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({ message: 'Champs non remplis'})
    } 
    
    try{
        // Vérification que l'email n'existe pas déjà dans la BDD
        const userExists = await prisma.user.findUnique({
            where: {
                email: String(email)
            }, select: {
                email: true
            }
        })

        if(userExists){
            res.send(JSON.stringify({"status": 409, "error": 'Cet utilisateur existe déjà dans la base de données', "token": null}));
            return;
        }

        // Hashage du mot de passe
        const hash = await bcrypt.hash(password, 10);

        try{
            //Création de l'utilisateur
            const user = await prisma.user.create({
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hash
                },
            })
            console.log('user : ', user)
            res.send(JSON.stringify({'status': 200, "error": null, "response": user.id}))
        }
        catch(e){
            res.send(JSON.stringify({"status" : 500, "error": 'Erreur lors de l\'enregistrement de l\'utilisateur', 'token': null}))
        }
    }
    catch(e){
        res.send(JSON.stringify({"status" : 500, "error": 'Requête non authentifiée', 'token': null}))
    }
};

// Connexion d'un utilisateur 

exports.login = async function login(req, res, next){

    const { email, password } = req.body;

    // Vérification que les chmaps sont bien remplis
    if(!email || !password){
        return res.status(400).json({ message: 'Champs non remplis'})
    }

    try{
        //  Recherche de l'utilisateur dans la BDD par son adresse email
        const user = await prisma.user.findUnique({
            where: {
                email: String(email)
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
            res.send(JSON.stringify({"status" : 401, "error": 'Cet utilisateur n\'existe pas.', 'token': null}));
            return;
        } else {
            try{
            // Vérification du mot de passe
            const valid = await bcrypt.compare(password, user.password) 

            console.log('valid : ', valid);
            console.log('req.body.password : ', password);
            console.log('user.password : ', user.password);
            console.log('user.id : ', user.id)

            if(!valid){
                res.send(JSON.stringify({"status" : 401, "error": 'Mot de passe incorrect', 'token': null}))
                return;
            }

            // Création du token de connexion 
            const token = jwt.sign({
                userId: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            },
                process.env.TOKEN, 
                { expiresIn: '1h' }
            );
            console.log('token connexion : ', token)
            res.send(JSON.stringify({"status": 200, "error": null, "token": token, "user": user }))
            }
            catch(e){
                res.send(JSON.stringify({"status" : 500, "error": 'Problème lors de l\'authentification', 'token': null}))
            }
        }
    }
    catch(e){
        res.send(JSON.stringify({"status" : 500, "error": 'Problème lors de la connexion', 'token': null}))
    }
    
};

// Suppression définitive d'un utilisateur 

exports.delete = async(req, res, next) => {
    // Recherche de l'utilisateur dans la BDD par son id
    const userExists = await prisma.user.findUnique({
        where: {
            id: Number(req.params.id) 
        },
        select: {
            id: true
        }
    })

    if(!userExists){
        return res.status(400).json({ message : 'Cet utilisateur n\'existe pas dans la base de données'})
    }

    // Suppression définitive de l'utilisateur
    const deleteUSer = await prisma.user.delete({
        where: {
            id: Number(req.params.id )
        },
    })
    res.json(deleteUSer)
};

// Modification d'un utilisateur

exports.modifyUser = async(req, res, next) => {
// Vérification de la présence et de la forme de l'id de l'utilisateur
    let userId = parseInt(req.params.id);

    if(!userId){
        return res.status(400).json({ message: 'Paramètres inconnus'})
    }

    try{
        // Récupération de l'utilisateur dans la BDD par son id
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id) 
            },
            select: {
                email: true,
                password: true 
            }
        })

        if(!user){
            return res.status(400).json({ message : 'Cet utilisateur n\'existe pas dans la base de données'})
        }

        // Hashage du mot de passe
        const hash = await bcrypt.hash(req.body.password, 10); 

        // Modification de l'adresse email et du mot de passe de l'utilisateur
        const modifiedUser = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                email: req.body.email,
                password: hash
            }
        })
        res.send(JSON.stringify({"status": 200, "error": null, "response": modifiedUser}));
    } 
    catch(err){
        return res.status(500).json({ message: 'Erreur lors de la connexion à la base de donnée' })
    }
};
