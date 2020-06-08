import React from "react";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function BackButton({ className }) {

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            type="submit"
            className={className}
        >
            Voltar
        </Button>
    )
}