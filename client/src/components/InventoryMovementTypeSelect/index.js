import React from "react";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { TYPE, TYPE_NAME } from '../../enums/InventoryMovements';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '25ch',
  }
}));

export default function InventoryMovementTypeSelect({ value, setType, createEmptyField = false }) {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>Tipo</InputLabel>
            <Select
                value={value || ''}
                onChange={(event) => setType(event.target.value)}
            >
                {createEmptyField === true ? 
                    <MenuItem value={''} >{"Não filtrar..."}</MenuItem> : undefined
                }
                <MenuItem key={TYPE.ENTRY} value={TYPE.ENTRY}>{TYPE_NAME.ENTRY}</MenuItem>
                <MenuItem key={TYPE.EXIT} value={TYPE.EXIT}>{TYPE_NAME.EXIT}</MenuItem>
            </Select>
        </FormControl>
    )
}