import React, { useState, useEffect } from 'react';
import DefaultTable from '../../components/DefaultTable';
import api from '../../services/api';

import './styles.css';

const columns = [
    { id: 'id', label: 'Id', maxWidth: 20 },
    { id: 'productCode', label: 'Código do produto', minWidth: 100 },
    {
        id: 'productDescription',
        label: 'Descrição do produto',
        minWidth: 170
    },
    {
        id: 'type',
        label: 'Tipo',
        minWidth: 50
    },
    {
        id: 'observation',
        label: 'Observação',
        minWidth: 170,
    },
];

function createData(id, productCode, productDescription, type, observation) {
    return { id, productCode, productDescription, type, observation };
}

const rows = [
    createData(1, '60.01', 'Frozen yoghurt', 'M', ''),
    createData(2, '70.01', 'Ice cream sandwich', 'M', ''),
    createData(3, '20.01', '1', 'M', ''),
    createData(4, '10.01', '2', 'M', ''),
    createData(5, '61', '3', 'M', ''),
    createData(1, '60.01', '5 yoghurt', 'M', ''),
    createData(2, '70.01', 'Ice 4 sandwich', 'M', ''),
    createData(3, '20.01', '5', 'M', ''),
    createData(4, '10.01', 'Cupcake', 'M', ''),
    createData(5, '61', '55', 'M', ''),
    createData(1, '60.01', '8 yoghurt', 'M', ''),
    createData(2, '70.01', '888 cream sandwich', 'M', ''),
    createData(3, '20.01', '888', 'M', ''),
    createData(4, '10.01', '333', 'M', ''),
    createData(5, '61', 'Gingerbread', 'M', ''),
    createData(1, '60.01', 'Frozen yoghurt', 'M', ''),
    createData(2, '70.01', '44 cream sandwich', 'M', ''),
    createData(3, '20.01', '44', 'M', ''),
    createData(4, '10.01', 'Cupcake', 'M', ''),
    createData(5, '61', 'Gingerbread', 'M', ''),
    createData(1, '60.01', 'Frozen yoghurt', 'M', ''),
    createData(2, '70.01', 'Ice cream sandwich', 'M', ''),
    createData(3, '20.01', '444', 'M', ''),
    createData(4, '10.01', 'Cupcake', 'M', ''),
    createData(5, '61', 'LAST', 'M', ''),
];

export default function Products({ history }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const authorization = localStorage.getItem('');
            const response = await api.get('/products', {
                headers: {
                    authorization
                }
            });

            setProducts(response.data)
        }

        loadProducts();
    }, []);
    
    return (
        <div className="products-container">
            <div className="products-search">

            </div>
            <DefaultTable columns={columns} rows={rows}/>
        </div>
    );
}