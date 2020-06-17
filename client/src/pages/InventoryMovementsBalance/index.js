import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import SearchIcon from "@material-ui/icons/Search";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { toDate } from '../../utils/formats'
import ClientsSelect from '../../components/ClientsSelect'
import TextField from "@material-ui/core/TextField";
import ProductsSelect from '../../components/ProductsSelect'

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
        marginBottom: 10,
        alignItems: 'baseline',
        flexFlow: 'wrap',
        display: 'flex',
    }
}));

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
        noteNumber: PropTypes.number.isRequired,
        movementDate: PropTypes.any.isRequired,
        quantity: PropTypes.number.isRequired,
        productCode: PropTypes.string.isRequired,
        productDescription: PropTypes.string.isRequired,
        client: PropTypes.string.isRequired,
        observation: PropTypes.string.isRequired,
        exits: PropTypes.arrayOf(
            PropTypes.shape({
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
    const [productId, setProductId] = useState(0);
    const [clientId, setClientId] = useState(0);
    const [noteNumber, setNoteNumber] = useState('');
    const [referencedNoteNumber, setReferencedNoteNumber] = useState('');
    const [initialMovementDate, setInitialMovementDate] = useState(null);
    const [finalMovementDate, setFinalMovementDate] = useState(null);
    
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await loadBalances(0, 10);
    }

    const loadBalances = async (page, limit) => {
        const response = await api.get("/inventory-movements/balance", {
            params: {
                page,
                limit,
                clientId: Number(clientId),
                productId: Number(productId),
                noteNumber: Number(noteNumber),
                referencedNoteNumber: Number(referencedNoteNumber),
            },
        });

        setData(response.data);
    }

    useEffect(() => {
        loadBalances(page, rowsPerPage);
    }, [page, rowsPerPage]);

    return (
        <React.Fragment>
            <form 
                className={classes.root}
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className={classes.searchForm}>  
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            className={classes.textField}
                            margin="normal"
                            style={{ margin: 8 }}
                            id="date-picker-inline"
                            label="Data inicial"
                            value={initialMovementDate}
                            onChange={(date) => setInitialMovementDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            className={classes.textField}
                            margin="normal"
                            style={{ margin: 8 }}
                            id="date-picker-inline"
                            label="Data inicial"
                            value={finalMovementDate}
                            onChange={(date) => setFinalMovementDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    
                    <TextField
                        id="outlined-search"
                        label="Número da nota..."
                        type="search"
                        variant="outlined"
                        value={noteNumber}
                        onChange={(event) => setNoteNumber(event.target.value)}
                        size="small"
                    />   

                    <TextField
                        id="outlined-search"
                        label="Nota referenciada..."
                        type="search"
                        variant="outlined"
                        value={referencedNoteNumber}
                        onChange={(event) => setReferencedNoteNumber(event.target.value)}
                        size="small"
                    />  

                    <ClientsSelect value={clientId} setClient={setClientId} createEmptyField={true} />
                    <ProductsSelect value={productId} setProduct={setProductId} createEmptyField={true}/>  

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

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
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
        </React.Fragment>
    );
}