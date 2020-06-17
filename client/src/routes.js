import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login'
import ProductsList from './pages/ProductsList';
import ProductsForm from './pages/ProductsForm';
import ClientsList from './pages/ClientsList';
import ClientsForm from './pages/ClientsForm';
import InventoryMovementsList from './pages/InventoryMovementsList';
import InventoryMovementsForm from './pages/InventoryMovementsForm';
import InventoryMovementsBalance from './pages/InventoryMovementsBalance';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' exact component={Login}/>
            
                <Header>
                    <PrivateRoute path='/products-list' component={ProductsList}/>
                    <PrivateRoute path='/products-form' component={ProductsForm}/>
                    <PrivateRoute path='/clients-list' component={ClientsList}/>
                    <PrivateRoute path='/clients-form' component={ClientsForm}/>
                    <PrivateRoute path='/inventory-movements-list' component={InventoryMovementsList}/>
                    <PrivateRoute path='/inventory-movements-form' component={InventoryMovementsForm}/>                    
                    <PrivateRoute path='/inventory-movements-balance' component={InventoryMovementsBalance}/>                    
                </Header>
            </Switch>
        </BrowserRouter>
    );
}