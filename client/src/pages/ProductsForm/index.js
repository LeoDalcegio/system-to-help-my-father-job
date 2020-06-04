import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import api from "../../services/api";

export default function ProductsForm({ history }) {
    const [productCode, setProductCode] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();    
    }

    return (
        <div className="products-form-container">
            <form
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
                        startIcon={<SearchIcon />}
                        type="submit"
                    >
                        Buscar
                    </Button>
                </div>
            </form>
        </div>
    );
}
