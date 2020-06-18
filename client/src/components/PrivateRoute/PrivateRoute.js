import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import HttpStatus from 'http-status-codes';
import api from '../../services/api'

const PrivateRoute = ({ Component, ...rest }) => {

    let isLoggedIn = false;
    
    async function checkIfLoged() {
        api.get('/users/me', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            if(response.status != HttpStatus.UNAUTHORIZED){
                isLoggedIn = true;
            }else{
                localStorage.removeItem('token')
            }
        });
    }
    
    return (
        <Route
            {...rest}
            render={props =>  (
                    checkIfLoged ? (
                        <Component {...props} />
                    ) : (
                            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                        )
                )
            }
        />
    )
}

export default PrivateRoute