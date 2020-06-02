import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login'
import Products from './pages/Products';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>

                <Header>
                    <Route path='/products' component={Products}/>
                </Header>
            </Switch>
        </BrowserRouter>
    );
}