import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login'
import Products from './pages/Products';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/products' component={Products}/>
            </Switch>
        </BrowserRouter>
    );
}