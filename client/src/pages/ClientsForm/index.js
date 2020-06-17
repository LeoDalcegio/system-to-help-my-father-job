import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';

import AddButton from '../../components/AddButton'
import BackButton from '../../components/BackButton'
import EditButton from '../../components/EditButton'
import CustomSnackbar from '../../components/CustomSnackbar'

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

export default function ClientsForm() {
    const [name, setName] = useState('');
    const [observation, setObservation] = useState('');
    const [snackbarState, setSnackbarState] = useState(false);

    const location = useLocation();
    const id = location?.state?.id;

    const history = useHistory();
    
    const classes = useStyles();

    useEffect(() => {
        if(id > 0){
            api.get(`/clients/${id}`).then(response => {
                const { name, observation } = response.data;

                setName(name);
                setObservation(observation);
            });
        }
    }, [id])
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const token = localStorage.getItem('token');
        
        const data = {
            name,
            observation,
        };

        const header = {
            headers: {
                authorization: token
            }
        }

        try {
            if(id > 0){
                await api.put(`/clients/${id}`, data, header);
            }else{
                await api.post('/clients', data, header);
            }
            
            history.push('/clients-list')
        }catch(error) {
            setSnackbarState({
                open: true,
                message: `Erro ao ${id > 0 ? 'atualizar' : 'incluir'} o registro. Erro original: ${error}`,
                severity: "error",
            });
        }
    }

    return (
        <div className={"clients-form-container"}>
            <form
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
                className={classes.root}
            >
                <div className="cliets-form-inputs">
                    <TextField
                        label="Nome"
                        style={{ margin: 8 }}
                        placeholder="Nome do cliente"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        margin="normal"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label="Observação"
                        style={{ margin: 8 }}
                        value={observation}
                        onChange={(event) => setObservation(event.target.value)}
                        placeholder="Observação do cliente"
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
                    <BackButton className={classes.button} onClick={() => history.push('/clients-list')}/>
                </div>
            </form>
        </div>
    );
}
