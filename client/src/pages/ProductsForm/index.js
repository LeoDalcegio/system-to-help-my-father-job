import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import AddButton from '../../components/AddButton'
import BackButton from '../../components/BackButton'
import EditButton from '../../components/EditButton'

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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '25ch',
  }
}));

export default function ProductsForm() {
    const [productCode, setProductCode] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [observation, setObservation] = useState('');
    const [type, setType] = useState('');

    const location = useLocation();
    const id = location?.state?.id;

    const history = useHistory();
    
    const classes = useStyles();

    useEffect(() => {
        if(id > 0){
            api.get(`/products/${id}`).then(response => {
                const { productCode, productDescription, observation, type } = response.data;

                setProductCode(productCode);
                setProductDescription(productDescription);
                setObservation(observation);
                setType(type);
            });
        }
    }, [id])
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const token = localStorage.getItem('token');
        
        const data = {
            productCode,
            productDescription,
            observation,
            type
        };

        const header = {
            headers: {
                authorization: token
            }
        }

        if(id > 0){
            await api.put(`/products/${id}`, data, header);
        }else{
            await api.post('/products', data, header);
        }
        
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

                    <FormControl className={classes.formControl}>
                        <InputLabel>Tipo</InputLabel>
                            <Select
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                            <MenuItem value={'M'}>Malha</MenuItem>
                            <MenuItem value={'F'}>Fio</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
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
                    
                    {   id > 0 
                        ?
                        <EditButton className={classes.button} />                    
                        :
                        <AddButton className={classes.button} />
                    }
                    <BackButton className={classes.button} onClick={() => history.push('/products-list')}/>
                </div>
            </form>
        </div>
    );
}
