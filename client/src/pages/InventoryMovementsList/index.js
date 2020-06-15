import React, { useState } from "react";
import DefaultTable from "../../components/DefaultTable";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';
import ViewListIcon from '@material-ui/icons/ViewList';

import { GetCorrespondentTypeName } from '../../utils/InventoryMovements'

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
    { id: "movementDate", label: "Data", align: 'right' },
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

    const history = useHistory();

    const classes = useStyles();

    const loadInventoryMovements = async (page, limit) => {
        const response = await api.get("/inventory-movements", {
            params: {                
                page,
                limit
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
                    color="primary"
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
