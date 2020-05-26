import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

export default function Products({ history }) {   
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const authorization = localStorage.getItem('');
            const response = await api.get('/products', { 
                headers: { 
                    authorization: 
                } 
            });
            
            setProducts(response.data)
        }

        loadProducts();
    }, []);
    
    return (
        //Id

        //product_code

        //product_description

        //type
        
        //observation
    )
}