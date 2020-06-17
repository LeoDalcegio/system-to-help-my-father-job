import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import HttpStatus from 'http-status-codes';
import api from '../../services/api'

const PrivateRoute = ({ component: Component, ...rest }) => {

    let isLoggedIn = false;
    
    const token = localStorage.getItem('token');

    if(token){
        api.get('/users/me', {
            headers: {
                authorization: token
            }
        }).then(response => {
            if(response.status !== HttpStatus.UNAUTHORIZED){
                isLoggedIn = true;
            }
        });
    }

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
            }
        />
    )
}

export default PrivateRoute