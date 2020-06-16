import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@material-ui/core/TablePagination';
import { toDate } from '../../utils/formats'

import api from "../../services/api";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    childTotal: {
        fontWeight: "bold"
    }
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    let totalQuantityByEntry = 0;

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                
                <TableCell align="right">{row.entry.id}</TableCell>
                <TableCell align="right">{row.entry.noteNumber}</TableCell>
                <TableCell align="right">{toDate(row.entry.movementDate)}</TableCell>
                <TableCell align="right">{row.entry.quantity}</TableCell>
                <TableCell align="left">{row.entry.productCode}</TableCell>
                <TableCell align="left">{row.entry.productDescription}</TableCell>
                <TableCell align="left">{row.entry.client}</TableCell>
                <TableCell align="left">{row.entry.observation}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Saídas
                            </Typography>
                            <Table size="small" aria-label="entries">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Id</TableCell>
                                        <TableCell align="right">Número da nota</TableCell>
                                        <TableCell align="right">Data</TableCell>
                                        <TableCell align="right">Quantidade</TableCell>
                                        <TableCell align="left">Código do produto</TableCell>
                                        <TableCell align="left">Descrição do produto</TableCell>
                                        <TableCell align="left">Observação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.exits.map((exitsRow) => {
                                        totalQuantityByEntry += Number(exitsRow.quantity);

                                        return (
                                            <TableRow key={exitsRow.id}>
                                            <TableCell align="right">{exitsRow.id}</TableCell>
                                            <TableCell align="right">{exitsRow.noteNumber}</TableCell>
                                            <TableCell align="right">{toDate(exitsRow.movementDate)}</TableCell>
                                            <TableCell align="right">{exitsRow.quantity}</TableCell>
                                            <TableCell align="left">{exitsRow.productCode}</TableCell>
                                            <TableCell align="left">{exitsRow.productDescription}</TableCell>
                                            <TableCell align="left">{exitsRow.observation}</TableCell>
                                            </TableRow>                                    
                                        )
                                    })}
                                    <TableRow>
                                        <TableCell className={classes.childTotal} align="left">Saldo total: </TableCell>
                                        <TableCell className={classes.childTotal} align="right" />
                                        <TableCell className={classes.childTotal} align="right" />
                                        <TableCell className={classes.childTotal} align="right">{row.entry.quantity - totalQuantityByEntry}</TableCell>
                                        <TableCell className={classes.childTotal} align="right" />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        noteNumber: PropTypes.number.isRequired,
        movementDate: PropTypes.any.isRequired,
        quantity: PropTypes.number.isRequired,
        productCode: PropTypes.string.isRequired,
        productDescription: PropTypes.string.isRequired,
        client: PropTypes.string.isRequired,
        observation: PropTypes.string.isRequired,
        exits: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                noteNumber: PropTypes.number,
                movementDate: PropTypes.any,
                quantity: PropTypes.number,
                productCode: PropTypes.string,
                productDescription: PropTypes.string,
                observation: PropTypes.string,
            }),
        ),
    }).isRequired,
};

export default function InventoryMovementsBalance() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        loadBalances(0, 10);
    }, []);

    useEffect(() => {
        loadBalances(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const loadBalances = async (page, limit) => {
        const response = await api.get("/inventory-movements/balance", {
            params: {
                page,
                limit
            },
        });

        setData(response.data);
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Número da nota</TableCell>
                        <TableCell align="right">Data da movimentação</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="left">Código do produto</TableCell>
                        <TableCell align="left">Descrição do produto</TableCell>
                        <TableCell align="left">Cliente</TableCell>
                        <TableCell align="left">Observação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}