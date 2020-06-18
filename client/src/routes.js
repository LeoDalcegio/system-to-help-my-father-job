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
                    <PrivateRoute path='/products-list' Component={ProductsList}/>
                    <PrivateRoute path='/products-form' Component={ProductsForm}/>
                    <PrivateRoute path='/clients-list' Component={ClientsList}/>
                    <PrivateRoute path='/clients-form' Component={ClientsForm}/>
                    <PrivateRoute path='/inventory-movements-list' Component={InventoryMovementsList}/>
                    <PrivateRoute path='/inventory-movements-form' Component={InventoryMovementsForm}/>                    
                    <PrivateRoute path='/inventory-movements-balance' Component={InventoryMovementsBalance}/>                    
                </Header>
            </Switch>
        </BrowserRouter>
    );
}