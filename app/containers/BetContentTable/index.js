import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { DeleteOutlined } from '@material-ui/icons';

import Button from '../../components/Button';

const createData = (no, betName, numberOfBets, totalBet, multiple, stakes, moneyWon1Time) => {
    return {no, betName, numberOfBets, totalBet, multiple, stakes, moneyWon1Time};
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        background: 'linear-gradient(to bottom, #430089, #82ffa1',
        color: '#ddd',
    },
    body: {

    },
}))(TableCell);

const useStyles = makeStyles({
    root: {
        width: '100%',
        minHeight: 200,
        borderWidth: 0.5, 
        borderColor: '#564729',
        borderStyle: 'solid'
    },
    container: {
        maxHeight: 440,
        scrollbarColor: 'transparent',
        overflow: 'auto',
    },
    table_row: {
        background: 'linear-gradient(to bottom, #29200E, #564729)',
    },
    table: {
        display: "block",
        maxWidth: 350,
    },
    body: {
        overflow: "auto",
        textAlign: 'center',
        height: "300px"
    },
});

const BetContentTable = props => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const columns = [
        {id: 'no', label: t("bet_content_table.no"), minWidth: 170, align: 'center' },
        {id: 'betName', label: t("bet_content_table.bet_name"), minWidth: 100, align: 'center'},
        {id: 'numberOfBets', label: t("bet_content_table.number_of_bets"), minWidth: 100, align: 'center'},
        {id: 'totalBet', label: t("bet_content_table.total_bet"), align: 'center', minWidth: 100},
        {id: 'multiple', label: t("bet_content_table.multiple"), align: 'center', minWidth: 100},
        {id: 'stakes', label: t("bet_content_table.stakes"), minWidth: 100, align: 'center'},
        {id: 'moneyWon1Time', label: t("bet_content_table.money_won_time"), minWidth: 100, align: 'center'}
    ];

    const [rows, setRows] = useState([
        createData('India', 'IN', 1324171354, 3287263, 10, 20, 2),
        createData('China', 'CN', 1403500365, 9596961, 10, 20, 2),
        createData('Italy', 'IT', 60483973, 301340, 10, 20, 2),
        createData('United States', 'US', 327167434, 9833520, 10, 20, 2),
        createData('Canada', 'CA', 37602103, 9984670, 10, 20, 2),
        createData('Australia', 'AU', 25475400, 7692024, 10, 20, 2),
        createData('Germany', 'DE', 83019200, 357578, 10, 20, 2),
        createData('Ireland', 'IE', 4857000, 70273, 10, 20, 2),
        createData('Mexico', 'MX', 126577691, 1972550, 10, 20, 2),
        createData('Japan', 'JP', 126317000, 377973, 10, 20, 2),
        createData('France', 'FR', 67022000, 640679, 10, 20, 2),
        createData('United Kingdom', 'GB', 67545757, 242495, 10, 20, 2),
        createData('Russia', 'RU', 146793744, 17098246, 10, 20, 2),
        createData('Nigeria', 'NG', 200962417, 923768, 10, 20, 2),
        createData('Brazil', 'BR', 210147125, 8515767, 10, 20, 2),
      ]);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const resetBetContent = () => {
        setRows([]);
    }

    return (
        <div style={{marginTop: 50, marginBottom: 50,}}>
            <div className="row_flex" style={{justifyContent: 'space-between'}}>
                <p className="bet_content">{t("bet_content_table.bet_content")}</p>
                <Button type='outlined' icon={<DeleteOutlined className="icon" />} title={t("select_num.erase")} onClick={() => {resetBetContent()}} />
            </div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className={classes.table_row}>
                                {columns.map((column) => (
                                    <StyledTableCell key={column.id} align={column.align} style={{minWidth: column.minWidth}} className={classes.table_row}>
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {
                            rows.length !== 0 ? (
                                <TableBody className={classes.body}>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={{backgroundColor: 'black', color: '#999', borderColor: '#564729', borderWidth: 0.1}}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            ) : (
                                <TableBody className={classes.body}>
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        <TableCell align="center" style={{backgroundColor: 'black', color: '#999', borderColor: '#564729', borderWidth: 0.1}}>{"There is no Data"}</TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        }
                    </Table>
                </TableContainer>
                {
                    rows.length !== 0 && (
                        <TablePagination
                            className={classes.table_row}
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            style={{color: '#ddd'}}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )
                }
            </Paper>
        </div>
    );
    
}

export default BetContentTable;