import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css';

export default function Login({ history }) {    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        if(!username || !password){
            alert('Informe um usuário e senha');
        }else{
            const response = await api.post('/auth/login', {
                username,
                password
            });
            
            if(response.status !== 201){
                return;
            }

            const { authorization } = response.data;

            localStorage.setItem('username', username);
            localStorage.setItem('authorization', authorization);
        }
    }

    return (
        <form className="login-form" onSubmit = {handleSubmit}>
            <h1 className="login-heading">Bem-vindo</h1>

            <label for="username">Usuário</label>
            <input  
                className="login-input" 
                type="text" 
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                id="username"
            />

            <label for="password">Senha</label>
            <input 
                className="login-input" 
                type="password" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                id="password"
            />

            <button className="login-button" type="submit">Entrar</button>                    
        </form>
    )
}