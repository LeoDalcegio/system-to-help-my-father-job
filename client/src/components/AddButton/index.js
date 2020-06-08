import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

export default function AddButton({ className }) {

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            type="submit"
            className={className}
        >
            Incluir
        </Button>
    )
}