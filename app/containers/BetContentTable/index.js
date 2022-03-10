import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
/** material ui */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DeleteOutlined } from "@material-ui/icons";
/** custom components */
import Button from "../../components/Button";
import { saveBetInfos } from "../../redux/actions/game";
import { rateConvertor } from "../../util/lib";

const createData = (no, betName, numberOfBets, totalBet, multiple, stakes, moneyWon1Time) => ({
  no,
  betName,
  numberOfBets,
  totalBet,
  multiple,
  stakes,
  moneyWon1Time,
});

const StyledTableCell = withStyles(() => ({
  head: {
    background: "linear-gradient(to bottom, #430089, #82ffa1",
    color: "#ddd",
  },
  body: {},
}))(TableCell);

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: 200,
    borderWidth: 0.5,
    borderColor: "#564729",
    borderStyle: "solid",
  },
  container: {
    maxHeight: 440,
    scrollbarColor: "transparent",
    overflow: "auto",
  },
  table_row: {
    background: "linear-gradient(to bottom, #29200E, #564729)",
  },
  table: {
    display: "block",
    maxWidth: 350,
  },
  body: {
    overflow: "auto",
    textAlign: "center",
    height: "300px",
  },
});

const BetContentTable = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { betInfos, betTableInfos } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const columns = [
    { id: "no", label: t("bet_content_table.no"), minWidth: 170, align: "center" },
    { id: "betName", label: t("bet_content_table.bet_name"), minWidth: 100, align: "center" },
    { id: "numberOfBets", label: t("bet_content_table.number_of_bets"), minWidth: 100, align: "center" },
    { id: "totalBet", label: t("bet_content_table.total_bet"), align: "center", minWidth: 100 },
    { id: "multiple", label: t("bet_content_table.multiple"), align: "center", minWidth: 100 },
    { id: "stakes", label: t("bet_content_table.stakes"), minWidth: 100, align: "center" },
    { id: "moneyWon1Time", label: t("bet_content_table.money_won_time"), minWidth: 100, align: "center" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const resetBetContent = () => {
    // setRows([]);
    props.clearAll();
    dispatch(saveBetInfos([]));
  };

  return (
    <div style={{ marginTop: 50, marginBottom: 50 }}>
      <div className="row_flex" style={{ justifyContent: "space-between" }}>
        <p className="bet_content">{t("bet_content_table.bet_content")}</p>
        <Button
          type="outlined"
          icon={<DeleteOutlined className="icon" />}
          title={t("select_num.erase")}
          onClick={() => {
            resetBetContent();
          }}
        />
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.table_row}>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={classes.table_row}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            {betTableInfos.length !== 0 ? (
              <TableBody className={classes.body}>
                {betTableInfos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    {columns.map((column) => {
                      const value = (column.id === 'stakes' || column.id === 'moneyWon1Time') ? rateConvertor(row[column.id]) : row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ backgroundColor: "black", color: "#999", borderColor: "#564729", borderWidth: 0.1 }}
                        >
                          {column.format && typeof value === "number" ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody className={classes.body}>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell
                    align="center"
                    style={{ backgroundColor: "transparent", color: "#999", borderColor: "#564729", borderWidth: 0.1 }}
                  >
                    There is no Data
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {betTableInfos.length !== 0 && (
          <TablePagination
            className={classes.table_row}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={betTableInfos.length}
            rowsPerPage={rowsPerPage}
            style={{ color: "#ddd" }}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </div>
  );
};

export default BetContentTable;
