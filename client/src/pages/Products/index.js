import React, { useState, useEffect } from "react";
import DefaultTable from "../../components/DefaultTable";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import api from "../../services/api";

import "./styles.css";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root, .MuiButton-root": {
            margin: theme.spacing(1),
        },
    },
}));

const columns = [
    { id: "id", label: "Id", maxWidth: 20 },
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
];

export default function Products({ history }) {
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const classes = useStyles();

    async function loadProducts() {
        const response = await api.get("/products", {
            params: {
                productCode,
                productDescription,
                page: 0,
                limit: 15
            },
        });

        setProducts(response.data);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        loadProducts();
    }

    return (
        <div className="products-container">
            <form 
                className={classes.root}
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="products-search">
                    <TextField
                        id="outlined-search"
                        label="Código do produto..."
                        type="search"
                        variant="outlined"
                        value={productCode}
                        onChange={(event) => setProductCode(event.target.value)}
                    />
                    <TextField
                        id="outlined-search"
                        label="Descrição do produto..."
                        type="search"
                        variant="outlined"
                        value={productDescription}
                        onChange={(event) => setProductDescription(event.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SearchIcon />}
                        type="submit"
                    >
                        Buscar
                    </Button>
                </div>
            </form>

            <DefaultTable columns={columns} rows={products} />
        </div>
    );
}
