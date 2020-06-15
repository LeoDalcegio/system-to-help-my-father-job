import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import AddButton from '../../components/AddButton'
import BackButton from '../../components/BackButton'
import EditButton from '../../components/EditButton'
import NumberFormatCustomQuantity from '../../components/NumberFormatCustomQuantity'

import { TYPE, TYPE_NAME } from '../../enums/InventoryMovements';

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



export default function InventoryMovementsForm() {
    const [product, setProduct] = useState('');
    const [noteNumber, setNoteNumber] = useState(0);
    const [referencedNoteNumber, setReferencedNoteNumber] = useState(0);
    const [movementDate, setMovementDate] = useState(new Date(Date.now()));
    const [quantity, setQuantity] = useState(0);
    const [client, setClient] = useState('');
    const [observation, setObservation] = useState('');
    const [type, setType] = useState('');

    const [clients, setClients] = useState([]);

    const [products, setProducts] = useState([])

    const location = useLocation();
    
    const id = location?.state?.id;

    const history = useHistory();
    
    const classes = useStyles();

    useEffect(() => {
        if(id > 0){
            api.get(`/inventory-movements/${id}`).then(response => {
                const {  observation, type, referencedNoteNumber, noteNumber, movementDate, quantity, client, product } = response.data;

                setObservation(type);
                setNoteNumber(noteNumber);
                setReferencedNoteNumber(referencedNoteNumber);
                setQuantity(quantity);
                setClient(client.id);
                setProduct(product.id);
                setObservation(observation);
                setMovementDate(movementDate);
                setType(type);
            });
        }
    }, [id]);

    useEffect(() => {
        api.get("/clients", {
            params: {
                page: 0,
                limit: 9999999
            },
        }).then((response) => {
            setClients(response.data)
        });
        
    }, []);

    useEffect(() => {
        api.get("/products", {
            params: {
                page: 0,
                limit: 9999999
            },
        }).then((response) => {
            setProducts(response.data)
        });
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const token = localStorage.getItem('token');
        
        const data = {
            productId: Number(product),
            clientId: Number(client),
            noteNumber: Number(noteNumber),
            referencedNoteNumber: Number(referencedNoteNumber),
            movementDate,
            quantity,
            observation,
            type
        };

        const header = {
            headers: {
                authorization: token
            }
        }

        if(id > 0){
            await api.put(`/inventory-movements/${id}`, data, header);
        }else{
            await api.post('/inventory-movements', data, header);
        }
        
        history.push('/inventory-movements-list')
    }

    return (
        <div className="inventory-movements-form-container">
            <form
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
                className={classes.root}
            >
                <div className="inventory-movements-form-inputs">

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            className={classes.textField}
                            margin="normal"
                            style={{ margin: 8 }}
                            id="date-picker-inline"
                            label="Data de movimentação"
                            value={movementDate}
                            onChange={(date) => setMovementDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    
                    <FormControl className={classes.formControl}>
                        <InputLabel>Tipo</InputLabel>
                        <Select
                            value={type || ''}
                            onChange={(event) => setType(event.target.value)}
                        >
                            <MenuItem key={TYPE.ENTRY} value={TYPE.ENTRY}>{TYPE_NAME.ENTRY}</MenuItem>
                            <MenuItem key={TYPE.EXIT} value={TYPE.EXIT}>{TYPE_NAME.EXIT}</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Número da nota"
                        style={{ margin: 8 }}
                        placeholder="Número da nota fiscal"
                        type="number"
                        value={noteNumber || ''}
                        onChange={(event) => setNoteNumber(parseInt(event.target.value))}
                        margin="normal"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label="Número da nota referenciada"
                        style={{ margin: 8 }}
                        placeholder="Número da nota fiscal referenciada"
                        type="number"
                        value={referencedNoteNumber || ''}
                        onChange={(event) => setReferencedNoteNumber(parseInt(event.target.value))}
                        margin="normal"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel>Cliente</InputLabel>
                        <Select
                                value={client || ''}
                                onChange={(event) => setClient(parseInt(event.target.value))}
                        >
                            {clients.map((client) => (
                                <MenuItem key={client.id} value={client.id}>{client.id} - {client.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    

                    <FormControl className={classes.formControl}>
                        <InputLabel>Produto</InputLabel>
                        <Select
                                value={product || ''}
                                onChange={(event) => setProduct(parseInt(event.target.value))}
                        >
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>{product.productCode} - {product.productDescription}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Quantidade"
                        style={{ margin: 8 }}
                        placeholder=""
                        value={quantity || ''}
                        onChange={(event) => setQuantity(parseInt(event.target.value))}
                        margin="normal"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            inputComponent: NumberFormatCustomQuantity,
                        }}
                    />

                    <TextField
                        label="Observação"
                        style={{ margin: 8 }}
                        value={observation || ''}
                        onChange={(event) => setObservation(event.target.value)}
                        placeholder="Observação da movimentação de estoque"
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
                    <BackButton className={classes.button} onClick={() => history.push('/inventory-movements-list')}/>
                </div>
            </form>
        </div>
    );
}
