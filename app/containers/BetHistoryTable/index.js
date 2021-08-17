/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { API_URL } from "../../constants/config";
import { getAllOrders } from "../../redux/actions/game";
import Button from "../../components/Button";

const socket = io.connect(API_URL);
const createData = (draw, lottery, betType, buyTime, numberOfBets, totalBet, multiple, stakes, status) => ({
  draw,
  lottery,
  betType,
  buyTime,
  numberOfBets,
  totalBet,
  multiple,
  stakes,
  status,
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
    backgroundColor: "rgba(0, 0, 0, .8)",
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

const BetHistoryTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { user } = useSelector((state) => state.user);
  // const {authenticated} = useSelector(state => state.auth);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const columns = [
    { id: "draw", label: t("bet_history_table.draw_title"), minWidth: 170, align: "center" },
    { id: "lottery", label: t("bet_history_table.lottery_title"), minWidth: 170, align: "center" },
    { id: "betType", label: t("bet_history_table.bet_type"), minWidth: 100, align: "center" },
    { id: "buyTime", label: t("bet_history_table.buy_time"), minWidth: 100, align: "center" },
    { id: "numberOfBets", label: t("bet_history_table.number_of_bets"), align: "center", maxWidth: 300, minWidth: 100 },
    { id: "totalBet", label: t("bet_history_table.total_bet"), align: "center", minWidth: 100 },
    { id: "multiple", label: t("bet_history_table.multiple"), minWidth: 100, align: "center" },
    { id: "stakes", label: t("bet_history_table.bets"), minWidth: 100, align: "center" },
    { id: "status", label: t("bet_history_table.status"), minWidth: 100, align: "center" },
  ];

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllHistories = () => {
    dispatch(getAllOrders(user?._id)).then((res) => {
      if (res) {
        const data = res.map((item) => 
          createData(
            item.createdAt.substr(0, 10),
            item.gameType,
            item.betType,
            item.createdAt.substr(5, 21),
            item.numbers.substr(0, 20) + "...",
            item.numbers.split(";").length - 1,
            item.multiple,
            item.betAmount,
            item.status
          )
        );
        setRows(data);
      }
    });
  };

  const onRefresh = () => {
    getAllHistories();
  };

  const handleNewGame = useCallback((game) => {
    if (game === props.gameType) {
      getAllHistories();
    }
  });

  useEffect(() => {
    getAllHistories();
    socket.emit("subscribe_timer", props.gameType);
    socket.on("new game start", handleNewGame);
    return () => {
      socket.removeAllListeners("new game start");
    }
  }, []);

  return (
    <div style={{ marginTop: 50, marginBottom: 50 }}>
      <div className="row_flex" style={{ justifyContent: "space-between" }}>
        <p className="bet_content">{t("bet_history_table.bet_history")}</p>
        <Button
          type="outlined"
          icon={<Refresh className="icon" />}
          onClick={() => {
            onRefresh();
          }}
        />
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.table_row}>
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align} className={classes.table_row}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            {rows.length !== 0 ? (
              <TableBody className={classes.body}>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.buyTime}>
                    {columns.map((column) => {
                      const value = row[column.id];
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
        {rows.length !== 0 && (
          <TablePagination
            className={classes.table_row}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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

export default BetHistoryTable;
