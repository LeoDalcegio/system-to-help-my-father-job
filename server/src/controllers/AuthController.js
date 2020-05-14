const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const passwordValidation = require('../utils/passwordValidation');

module.exports = {
    
    /**
     * Registrar um usuário
     * @param  {[String]} request.body.nome Nome do usuário
     * @param  {[String]} request.body.email Email do usuário
     * @param  {[String]} request.body.senha Senha do usuário
     * @return {[JSON]} JSON contendo o usuário
     */
    async register(request, response){
        const { nome, email, senha } = request.body;

        try { 
            const emailExist = await connection('usuario')
                .where({ email: email })
                .first()
                .select('id');
        
            if(emailExist) return response.status(409).send({ error: 'Email já existente' });
            
            const hashPassword = await passwordValidation.encrypt(senha);
            
            const usuario = {
                nome,
                email,
                senha: hashPassword
            };
            
            await connection('usuario').insert(usuario);

            usuario.senha = undefined;

            return response.send(usuario);
        }catch(err){
            return response.status(400).send({ error: err.message });
        }
    },

    /**
     * Fazer login com um usuário já registrado
     * @param  {[String]} request.body.email Email do usuário
     * @param  {[String]} request.body.senha Senha do usuário
     * @return {[JSON]} JSON contendo o usuário
     */
    async login(request, response) {
        const { email } = request.body;

        try {
            const usuario = await connection('usuario')
                .where({ email: email })
                .first()
                .select("*");

            if(!usuario) return response.status(400).send({error: 'Email ou senha incorretos'});

            const validPassword = await passwordValidation.comparePasswords(request.body.senha, usuario.senha);
            
            if(!validPassword) return response.status(401).send({error: 'Email ou senha incorretos'});
            
            const token = jwt.sign({ id: usuario.id }, process.env.TOKEN_SECRET, {
                expiresIn: 604800,
            });

            usuario.senha = undefined;
            
            return response.header('x-access-token', token).send(usuario);
        }catch(err){
            return response.status(401).send({ error: err.message });
        }
    },
}
