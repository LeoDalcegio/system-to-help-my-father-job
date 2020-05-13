const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const passwordValidation = require('../utils/passwordValidation');

module.exports = {
    
    /**
     * Registrar um usuário
     * @param  {[String]} request.body.nome nome do usuário
     * @param  {[String]} request.body.email email do usuário
     * @param  {[String]} request.body.senha senha do usuário
     * @return {[JSON]} JSON contendo o usuário
     */
    async register(request, response){
        const { email } = request.body;

        try { 
            const emailExist = await connection('usuario').where({ email: email }).first().select('id');
        
            if(emailExist) return response.status(409).send({ error: 'Email já existente' });
            
            const hashPassword = await passwordValidation.encrypt(request.body.senha);
            
            const user = {
                nome: request.body.nome,
                email: request.body.email,
                senha: hashPassword
            };
            
            await connection('usuario').insert(user);

            user.senha = undefined;

            return response.send(user);
        }catch(err){
            return response.status(400).send(err);
        }
    },

    /**
     * Fazer login com um usuário já registrado
     * @param  {[String]} request.body.email email do usuário
     * @param  {[String]} request.body.senha senha do usuário
     * @return {[JSON]} JSON contendo o usuário
     */
    async login(request, response) {
        const { email } = request.body;

        try {
            const user = await connection('usuario').where({ email: email }).first().select();

            if(!user) return response.status(400).send({error: 'Email ou senha incorretos'});

            const validPassword = await passwordValidation.comparePasswords(request.body.senha, user.senha);
            
            if(!validPassword) return response.status(401).send({error: 'Email ou senha incorretos'});
            
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
                expiresIn: 604800,
            });

            user.senha = undefined;
            
            return response.header('authentication', token).send(user);
        }catch(err){
            return response.status(401).send(err);
        }
    },
}
