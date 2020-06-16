import React, { useState } from "react";
import DefaultTable from "../../components/DefaultTable";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';

import { GetCorrespondentTypeName } from '../../utils/products'

import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root, .MuiButton-root": {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },
    button: {
        marginTop: theme.spacing(1),
    },
    searchForm: {
        marginBottom: 10
    }
}));

const columns = [
    { id: "id", label: "Id", maxWidth: 10 },
    { id: "productCode", label: "Código do produto", minWidth: 100 },
    {
        id: "productDescription",
        label: "Descrição do produto",
        minWidth: 170,
    },
    {
        id: "type",
        label: "Tipo",
        minWidth: 50,
    },
    {
        id: "observation",
        label: "Observação",
        minWidth: 170,
    },
    { id: "actions", label: "Ações", padding: 10},

];

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState('');
    const [productDescription, setProductDescription] = useState('');
    
    const history = useHistory();

    const classes = useStyles();

    const loadProducts = async (page, limit) => {
        const response = await api.get("/products", {
            params: {
                productCode,
                productDescription,
                page,
                limit
            },
        });

        response.data.forEach(function(part, index, theArray) {
            theArray[index].type = GetCorrespondentTypeName(theArray[index].type)
        });

        setProducts(response.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await loadProducts(0, 10);
    }

    const deleteData = async (id) => {
        const token = localStorage.getItem('token');

        const response = await api.delete(`/products/${id}`, {
            headers: {
                authorization: token
            }
        });
 
        if(response.status === 200){
            setProducts(products.filter(product => product.id !== id));
        }
    }
    
    const updateData = async (id) => {

        history.push('products-form', {
            id
        })
    }

    return (
        <div className="products-list-container">
            <form 
                className={classes.root}
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className={classes.searchForm}>
                    <TextField
                        id="outlined-search"
                        label="Código do produto..."
                        type="search"
                        variant="outlined"
                        value={productCode}
                        onChange={(event) => setProductCode(event.target.value)}
                        size="small"
                    />
                    <TextField
                        id="outlined-search"
                        label="Descrição do produto..."
                        type="search"
                        variant="outlined"
                        value={productDescription}
                        onChange={(event) => setProductDescription(event.target.value)}
                        size="small"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SearchIcon />}
                        type="submit"
                    >
                        Buscar
                    </Button>
                </div>
            </form>

            <DefaultTable columns={columns} rows={products} loadData={loadProducts} deleteData={deleteData} updateData={updateData}/>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={() => history.push('/products-form')}
            >
                Incluir
            </Button>
        </div>
    );
}
