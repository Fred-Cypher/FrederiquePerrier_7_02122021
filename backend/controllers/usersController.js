const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt'); // Permet de chiffrer le mot de passe

const jwt = require('jsonwebtoken'); // Permet de créer et de vérifier un token d'authentification

const User = new PrismaClient(); 


//Inscription d'un utilisateur

exports.signup = (req, res, next) => {
    // Vérification que l'utilisateur n'est pas déjà dans la base de données
    const userExists = User.findUnique({
        where: {
            alias: req.body.alias
        },
        select: {
            alias: true
        }
    })
    .then(() =>{
        // Enregistrement dans la base de données si l'utilisateur n'existe pas
        if(!userExists) {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = User.create({
                    data: {
                        first_name: req.body.firtsName,
                        last_name: req.body.lastName,
                        alias: req.body.alias,
                        email: req.body.email,
                        password: hash
                    }
                })
                user.save()
                    .then(() => res.status(201).json({ message: 'Nouvel utilisateur créé'}))
                    .catch(error => res.status(400).json({ error }));
            })
        } else if(userExists){
            // L'utilisateur ne peut pas s'enregistrer si un autre avec le même pseudo existe déjà
            return res.json({ message: 'Cet utilisateur existe déjà, veuillez choisir un autre pseudo'})
        }
    })
    .catch(error => res.status(500).json({ error }));
};

// Connexion d'un utilisateur 

exports.login = (req, res, next) => {
    const userExists = User.findUnique({
        where: {
            alias: req.body.alias,
            email: req.body.email
        }
    })
    .then(user => {
        if(!userExists) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' })
        }
        // Comparaison du mot de passe chiffré
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect '})
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN,
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}; 


//Suppression d'un compte utilisateur

exports.deleteAccount = (req, res, next) => {
    const userDelete = User.delete({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Le compte utilisateur a bien été supprimé'}))
};