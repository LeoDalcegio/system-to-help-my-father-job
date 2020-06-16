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

export default function ClientsSelect({ value, setClient, createEmptyField = false }) {
    const [clients, setClients] = useState([]);

    const classes = useStyles();

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

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>Cliente</InputLabel>
            <Select
                    value={value || ''}
                    onChange={(event) => setClient(parseInt(event.target.value))}
            >
                {createEmptyField === true ? 
                    <MenuItem value={''} >{"Não filtrar..."}</MenuItem> : undefined
                }
                {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>{client.id} - {client.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}