import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css'

export default function Login({ history }) {    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        if(!username || !password){
            alert('Informe um usuário e senha');
        }else{
            const response = await api.post('/login', {
                username,
                password
            });

            if(response.status !== 200){
                return;
            }
            
            const { authorization } = response.data;

            localStorage.setItem('username', username);
            localStorage.setItem('authorization', authorization);
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit = {handleSubmit}>
                <h1 className="heading">Login</h1>
                
                    <input 
                        placeholder="" 
                        className="login-input" 
                        type="text" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <input 
                        placeholder="" 
                        className="login-input mt-20" 
                        type="password" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                <button className="button mt-20" type="submit">Sign In</button>                    
            </form>
        </div>
    )
}