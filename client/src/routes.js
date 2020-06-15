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

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>

                <Header>
                    <Route path='/products-list' component={ProductsList}/>
                    <Route path='/products-form' component={ProductsForm}/>
                    <Route path='/clients-list' component={ClientsList}/>
                    <Route path='/clients-form' component={ClientsForm}/>
                    <Route path='/inventory-movements-list' component={InventoryMovementsList}/>
                    <Route path='/inventory-movements-form' component={InventoryMovementsForm}/>                    
                    <Route path='/inventory-movements-balance' component={InventoryMovementsBalance}/>                    
                </Header>
            </Switch>
        </BrowserRouter>
    );
}