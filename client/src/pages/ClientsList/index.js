import React, { useState } from "react";
import DefaultTable from "../../components/DefaultTable";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';

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
    { id: "name", label: "Nome", minWidth: 100 },
    {
        id: "observation",
        label: "Observação",
        minWidth: 170,
    },
    { id: "actions", label: "Ações", padding: 10},

];

export default function ClientsList() {
    const [clients, setClients] = useState([]);
    const [name, setName] = useState('');

    const history = useHistory();

    const classes = useStyles();

    const loadClients = async (page, limit) => {
        const response = await api.get("/clients", {
            params: {
                name,
                page,
                limit
            },
        });

        setClients(response.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await loadClients(0, 10);
    }

    const deleteData = async (id) => {
        const token = localStorage.getItem('token');

        const response = await api.delete(`/clients/${id}`, {
            headers: {
                authorization: token
            }
        });
 
        if(response.status === 200){
            setClients(clients.filter(client => client.id !== id));
        }
    }
    
    const updateData = async (id) => {

        history.push('clients-form', {
            id
        })
    }

    return (
        <div className="clients-list-container">
            <form 
                className={classes.root}
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className={classes.searchForm}>
                    <TextField
                        id="outlined-search"
                        label="Nome do cliente..."
                        type="search"
                        variant="outlined"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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

            <DefaultTable columns={columns} rows={clients} loadData={loadClients} deleteData={deleteData} updateData={updateData}/>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={() => history.push('/clients-form')}
            >
                Incluir
            </Button>
        </div>
    );
}
