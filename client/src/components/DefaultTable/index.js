import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import './styles.css';

const useStyles = makeStyles({
    table: {
        maxWidth: '80vw',
        margin: 'auto'
    },
    root: {
        width: '100%',
    }
});

export default function DefaultTable({ columns, rows, loadData, deleteData, updateData }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        loadData(page, rowsPerPage)
    }, [page, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const classes = useStyles();
    
    const editAndDeleteIcons = (id)  => (
        <>
            <IconButton onClick={async () => await deleteData(id)}>
                <DeleteIcon color="secondary" />
            </IconButton>
            <IconButton onClick={async () => await updateData(id)}>
                <EditIcon color="primary" />
            </IconButton>
        </>
    );
        
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ 
                                        minWidth: column.minWidth,
                                        maxWidth: column.maxWidth,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice().map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}> 
                                    {columns.map((column) => {
                                        const value = row[column.id];                                        
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {
                                                    column.id === 'actions' 
                                                ?
                                                    editAndDeleteIcons(row.id)
                                                :                                                     
                                                    column.format && typeof value === 'number' ? column.format(value) : value                                                
                                                }
                                            </TableCell>                                            
                                        );                                        
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}