import React, { useState, useEffect } from 'react';
import DefaultTable from '../../components/DefaultTable';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import api from '../../services/api';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root, .MuiButton-root': {
      margin: theme.spacing(1),
    },
  },
}));

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
    const classes = useStyles();

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
            <form className={classes.root} noValidate autoComplete="off">
                <div className="products-search">
                    <TextField id="outlined-search" label="Código do produto..." type="search" variant="outlined" />
                    <TextField id="outlined-search" label="Descrição do produto..." type="search" variant="outlined" />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SearchIcon />}
                    >
                        Buscar
                    </Button>
                </div>
            </form>

            <DefaultTable columns={columns} rows={rows}/>
        </div>
    );
}