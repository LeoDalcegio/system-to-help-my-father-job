import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css';

export default function Login({ history }) {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        if(!email || !password){
            alert('Informe um email e senha');
        }else{
            const response = await api.post('/users/login', {
                email,
                password
            });
            
            if(response.status !== 201){
                return;
            }
            
            const { authorization } = response.data;

            localStorage.setItem('email', email);
            localStorage.setItem('authorization', authorization);

            history.push('/products')
        }
    }

    return (
        <form className="login-form" onSubmit = {handleSubmit}>
            <h1 className="login-heading">Bem-vindo</h1>

            <label htmlFor="email">Email</label>
            <input  
                className="login-input" 
                type="email" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="email"
            />

            <label htmlFor="password">Senha</label>
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