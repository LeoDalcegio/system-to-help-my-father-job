import React, { useState } from "react";
import DefaultTable from "../../components/DefaultTable";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

import api from "../../services/api";

import "./styles.css";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root, .MuiButton-root": {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },
    button: {
        marginTop: theme.spacing(1),
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

export default function ProductsList({ history }) {
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const classes = useStyles();

    const loadProducts = async (page, limit) => {
        // const response = await api.get("/products", {
        //     params: {
        //         productCode,
        //         productDescription,
        //         page,
        //         limit
        //     },
        // });

        //setProducts(response.data);

        setProducts([
  {
    "id": "1",
    "observation": "",
    "productCode": "123.43",
    "productDescription": "desc",
    "type": "M",
    "createdAt": "2020-05-29T12:47:50.156Z",
    "updatedAt": "2020-05-29T12:47:50.156Z"
  },
  {
    "id": "2",
    "observation": "string",
    "productCode": "string",
    "productDescription": "string",
    "type": "M",
    "createdAt": "2020-06-02T15:59:31.138Z",
    "updatedAt": "2020-06-02T15:59:31.138Z"
  },
  {
    "id": "30",
    "observation": "strinjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjg",
    "productCode": "a",
    "productDescription": "string",
    "type": "F",
    "createdAt": "2020-06-02T15:59:48.258Z",
    "updatedAt": "2020-06-02T15:59:48.258Z"
  },
  {
    "id": "34",
    "observation": "string",
    "productCode": "aa",
    "productDescription": "string",
    "type": "F",
    "createdAt": "2020-06-02T16:05:34.678Z",
    "updatedAt": "2020-06-02T16:05:34.678Z"
  },
  {
    "id": "35",
    "observation": "string",
    "productCode": "aaa",
    "productDescription": "string",
    "type": "F",
    "createdAt": "2020-06-02T16:07:23.686Z",
    "updatedAt": "2020-06-02T16:07:23.686Z"
  },
  {
    "id": "36",
    "observation": "string",
    "productCode": "b",
    "productDescription": "string",
    "type": "F",
    "createdAt": "2020-06-02T16:07:26.099Z",
    "updatedAt": "2020-06-02T16:07:26.099Z"
  },
  {
    "id": "37",
    "observation": "string",
    "productCode": "C",
    "productDescription": "string",
    "type": "F",
    "createdAt": "2020-06-02T16:07:29.674Z",
    "updatedAt": "2020-06-02T16:07:29.674Z"
  },
  {
    "id": "38",
    "observation": "string",
    "productCode": "D",
    "productDescription": "string",
    "type": "F",
    "createdAt": "2020-06-02T16:07:31.648Z",
    "updatedAt": "2020-06-02T16:07:31.648Z"
  },
  {
    "id": "39",
    "observation": "string",
    "productCode": "e",
    "productDescription": "string",
    "type": "F",
    "createdAt": "2020-06-02T16:07:34.149Z",
    "updatedAt": "2020-06-02T16:07:34.149Z"
  },
  {
    "id": "40",
    "observation": "string",
    "productCode": "efff",
    "productDescription": "string",
    "type": "F",
    "createdAt": "2020-06-02T16:07:35.957Z",
    "updatedAt": "2020-06-02T16:07:35.957Z"
  }
])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        loadProducts(0, 10);
    }

    return (
        <div className="products-list-container">
            <form 
                className={classes.root}
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="products-list-search">
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

            <DefaultTable columns={columns} rows={products} loadData={loadProducts} />
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
