import React from "react";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';

export default function EditButton({ className }) {

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            type="submit"
            className={className}
        >
            Editar
        </Button>
    )
}