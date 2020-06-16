import React, { useState, useEffect } from "react";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '25ch',
  }
}));

export default function ProductsSelect({ value, setProduct, createEmptyField = false }) {
    const [products, setProducts] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        api.get("/products", {
            params: {
                page: 0,
                limit: 9999999
            },
        }).then((response) => {
            setProducts(response.data)
        });
        
    }, []);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>Produto</InputLabel>
            <Select
                    value={value || ''}
                    onChange={(event) => setProduct(parseInt(event.target.value))}
            >
                {createEmptyField === true ? 
                    <MenuItem value={''} >{"Não filtrar..."}</MenuItem> : undefined
                }
                {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>{product.productCode} - {product.productDescription}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}