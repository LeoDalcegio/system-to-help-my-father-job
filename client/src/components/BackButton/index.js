import React from "react";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function BackButton({ className, onClick }) {

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            type="submit"
            className={className}
            onClick={onClick}
        >
            Voltar
        </Button>
    )
}