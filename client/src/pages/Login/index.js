import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import CustomSnackbar from '../../components/CustomSnackbar'
import './styles.css';

export default function Login() {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarState, setSnackbarState] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
            history.push('/inventory-movements-list')
        }
    }, [])

    async function handleSubmit(e){
        e.preventDefault();

        if(!email || !password){
            setSnackbarState({
                open: true,
                message: 'Informe um usuário e senha',
                severity: "error",
            });
        }else{
            try {
                const response = await api.post('/users/login', {
                    email,
                    password
                });

                const { token } = response.data;

                localStorage.setItem('email', email);
                localStorage.setItem('token', token);

                setTimeout(() => { 
                    history.push('/inventory-movements-list')
                }, 500);
            }catch(error) {
                setSnackbarState({
                    open: true,
                    message: 'Erro ao realizar o login',
                    severity: "error"
                });
            }            
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

            <CustomSnackbar  snackbarState={snackbarState} />
        </form>
    )
}