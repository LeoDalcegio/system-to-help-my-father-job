import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login'
import ProductsList from './pages/ProductsList';
import ProductsForm from './pages/ProductsForm';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>

                <Header>
                    <Route path='/products-list' component={ProductsList}/>
                    <Route path='/products-form' component={ProductsForm}/>
                </Header>
            </Switch>
        </BrowserRouter>
    );
}