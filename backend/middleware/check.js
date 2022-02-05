const jwt = require('jsonwebtoken');

// Extraction du token
const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    };

    const matches = authorization.match(/(bearer)\s+(\S+)/i);

    return matches && matches[2]
};

// Vérification de la présence d'un token
const checkToken = (req, res, next) => {
    
    const token = req.headers.authorization && extractBearer(req.headers.authorization);

    if(!token){
        return res.status(401).json({ message: 'Vous n\'êtes pas autorisé à vous connecter'})
    };

    // Contrôle de la validité du token
    jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
        if(err){
            return res.status(401).json({ message: 'Token invalide'})
        }
        next()
    })
};

module.exports = checkToken; 