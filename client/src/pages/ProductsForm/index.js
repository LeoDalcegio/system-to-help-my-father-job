import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  button: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  }
}));

export default function ProductsForm() {
    const [productCode, setProductCode] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [observation, setObservation] = useState('');

    const history = useHistory();
    
    const classes = useStyles();
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const token = localStorage.getItem('token');
        
        await api.post('/products', {
            productCode,
            productDescription,
            observation,
            type: 'M'
        },{
            params: {
                authorization: token
            }
        })
        
        history.push('/products-list')
    }

    return (
        <div className={"products-form-container"}>
            <form
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
                className={classes.root}
            >
                <div className="products-form-inputs">
                    <TextField
                        id="standard"
                        label="Produto"
                        style={{ margin: 8 }}
                        placeholder="Código do produto"
                        value={productCode}
                        onChange={(event) => setProductCode(event.target.value)}
                        margin="normal"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard"
                        label="Descrição"
                        style={{ margin: 8 }}
                        placeholder="Descrição do produto"
                        value={productDescription}
                        onChange={(event) => setProductDescription(event.target.value)}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Observação"
                        style={{ margin: 8 }}
                        value={observation}
                        onChange={(event) => setObservation(event.target.value)}
                        placeholder="Observação do produto"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        type="submit"
                        className={classes.button}
                    >
                        Incluir
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        type="submit"
                        className={classes.button}
                    >
                        Voltar
                    </Button>
                </div>
            </form>
        </div>
    );
}
