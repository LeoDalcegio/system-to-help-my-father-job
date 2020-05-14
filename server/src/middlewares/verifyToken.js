const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next){
    const token = req.header('x-access-token');

    if(!token) return res.status(401).send({ error: 'Accesso negado' });
    
    try{
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if (err) return res.status(500).send({ error: 'Falha ao autenticar usuário.' });
        });

        return next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}