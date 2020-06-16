import React, { useState } from "react";
import DefaultTable from "../../components/DefaultTable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';
import ViewListIcon from '@material-ui/icons/ViewList';
import ClientsSelect from '../../components/ClientsSelect'
import TextField from "@material-ui/core/TextField";
import ProductsSelect from '../../components/ProductsSelect'
import InventoryMovementTypeSelect from '../../components/InventoryMovementTypeSelect'

import { GetCorrespondentTypeName } from '../../utils/inventoryMovements'
import { toDate } from '../../utils/formats'

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
    },
}));

const columns = [
    { id: "id", label: "Id",  align: 'right' },
    { id: "movementDate", label: "Data", align: 'right', type: 'date', format: toDate },
    { id: "noteNumber", label: "Número da Nota", align: 'right' },
    { id: "type", label: "Tipo", align: 'left' },
    { id: "productCode", label: "Código do Produto", align: 'left' },
    { id: "productDescription", label: "Descrição do Produto", align: 'left' },
    { id: "client", label: "Cliente",  align: 'left' },
    { id: "quantity", label: "Quantidade", align: 'right' },
    {
        id: "observation",
        label: "Observação",
        align: 'left'
    },
    { id: "actions", label: "Ações", align: 'right'},
];

export default function InventoryMovementsList() {
    const [inventoryMovements, setInventoryMovements] = useState([])
    const [productId, setProductId] = useState(0);
    const [clientId, setClientId] = useState(0);
    const [noteNumber, setNoteNumber] = useState('');
    const [referencedNoteNumber, setReferencedNoteNumber] = useState('');
    const [type, setType] = useState('');

    const history = useHistory();

    const classes = useStyles();

    const loadInventoryMovements = async (page, limit) => {
        const response = await api.get("/inventory-movements", {
            params: {                
                page,
                limit,
                clientId: Number(clientId),
                productId: Number(productId),
                noteNumber: Number(noteNumber),
                referencedNoteNumber: Number(referencedNoteNumber),
                type
            },
        });

        response.data.forEach(function(part, index, theArray) {
            theArray[index].type = GetCorrespondentTypeName(theArray[index].type)
        });

        setInventoryMovements(response.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await loadInventoryMovements(0, 10);
    }

    const deleteData = async (id) => {
        const token = localStorage.getItem('token');

        const response = await api.delete(`/inventory-movements/${id}`, {
            headers: {
                authorization: token
            }
        });
 
        if(response.status === 200){
            setInventoryMovements(inventoryMovements.filter(inventoryMovement => inventoryMovement.id !== id));
        }
    }
    
    const updateData = async (id) => {

        history.push('inventory-movements-form', {
            id
        })
    }

    return (
        <div className="inventory-movements-list-container">
            <form 
                className={classes.root}
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="inventory-movements-list-search">  
                    <TextField
                        id="outlined-search"
                        label="Número da nota..."
                        type="search"
                        variant="outlined"
                        value={noteNumber}
                        onChange={(event) => setNoteNumber(event.target.value)}
                        size="small"
                    />   

                    <TextField
                        id="outlined-search"
                        label="Nota referenciada..."
                        type="search"
                        variant="outlined"
                        value={referencedNoteNumber}
                        onChange={(event) => setReferencedNoteNumber(event.target.value)}
                        size="small"
                    />  

                    <InventoryMovementTypeSelect value={type} setType={setType} createEmptyField={true} />

                    <ClientsSelect value={clientId} setClient={setClientId} createEmptyField={true} />
                    <ProductsSelect value={productId} setProduct={setProductId} createEmptyField={true}/>   
                    
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

            <DefaultTable columns={columns} rows={inventoryMovements} loadData={loadInventoryMovements} deleteData={deleteData} updateData={updateData}/>
            
            <div className="bottom-buttons">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={() => history.push('/inventory-movements-form')}
                >
                    Incluir
                </Button>

                <Button
                    variant="contained"
                    color="inherit"
                    className={classes.button} 
                    startIcon={<ViewListIcon />}
                    onClick={() => history.push('/inventory-movements-balance')}
                >
                    Consultar Saldos
                </Button>
            </div>
        </div>
    );
}
