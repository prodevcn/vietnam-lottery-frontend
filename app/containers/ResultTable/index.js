import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../components/Dropdown";
import { getGameHistoriesForGameType } from "../../redux/actions/game";
import { formatDate, createDate } from "../../util/lib";

const ResultTable = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentGameType } = useSelector((state) => state.game);
  const { gameResults } = useSelector((state) => state.game);
  const [selectedHistory, setSelectedHistory] = useState(gameResults[0]);

  const onChangeItem = (val) => {
    setSelectedHistory(val);
  };

  const getHistory = () => {
    dispatch(getGameHistoriesForGameType(props.gameType))
      .then((res) => {
        setSelectedHistory(res[0]);
      })
      .catch((err) => {
        console.error('[ERROR]:[GET_ALL_HISTORY]', err);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    setSelectedHistory(gameResults[0]);
  }, [gameResults]);

  return (
    <div className="betting_table">
      <div className="table_container">
        <h5 className="result_text">
          {currentGameType.label} {t("lottery_result")}
        </h5>
        {
          currentGameType.value !== 'mega' && (
            <Dropdown
              data={gameResults}
              onChange={(target) => {
                onChangeItem(target);
              }}
            />
          )
        }
        <p className="result_title">
          {t("result_table.result")} : {selectedHistory ? formatDate(selectedHistory?.endTime) : formatDate(Date.now())}
        </p>
        <table className="table_section">
          {
            (
              currentGameType.value === 'northern' ||
              currentGameType.value === 'hanoi'
            ) && (
              <tbody>
                <tr className="table_row">
                  <td style={{ color: "red" }}>{t("result_table.red_award")}</td>
                  <td>{selectedHistory?.numbers?.redAward}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.first_prize")}</td>
                  <td>{selectedHistory?.numbers?.first}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.second_prize")}</td>
                  <td>{selectedHistory?.numbers?.second}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.third_prize")}</td>
                  <td>{selectedHistory?.numbers?.third}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.fourth_prize")}</td>
                  <td>{selectedHistory?.numbers?.fourth}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.fifth_prize")}</td>
                  <td>{selectedHistory?.numbers?.fifth}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.sixth_prize")}</td>
                  <td>{selectedHistory?.numbers?.sixth}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.seventh_prize")}</td>
                  <td>{selectedHistory?.numbers?.seventh}</td>
                </tr>
              </tbody>
            )
          }
          {
            (
              currentGameType.value === 'hochiminh' ||
              currentGameType.value === 'saigon' ||
              currentGameType.value === 'superspeed' ||
              currentGameType.value === 'southern-hochiminh' ||
              currentGameType.value === 'central-quangnam'
            ) && (
              <tbody>
                <tr className="table_row">
                  <td style={{ color: "red" }}>{t("result_table.red_award")}</td>
                  <td>{selectedHistory?.numbers?.redAward}</td>
                </tr>
                <tr className="table_row">
                  <td className="state_text">{t("result_table.first_prize")}</td>
                  <td>{selectedHistory?.numbers?.first}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.second_prize")}</td>
                  <td>{selectedHistory?.numbers?.second}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.third_prize")}</td>
                  <td>{selectedHistory?.numbers?.third}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.fourth_prize")}</td>
                  <td>{selectedHistory?.numbers?.fourth}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.fifth_prize")}</td>
                  <td>{selectedHistory?.numbers?.fifth}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.sixth_prize")}</td>
                  <td>{selectedHistory?.numbers?.sixth}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.seventh_prize")}</td>
                  <td>{selectedHistory?.numbers?.seventh}</td>
                </tr>
                <tr className="table_row">
                  <td>{t("result_table.eighth_prize")}</td>
                  <td>{selectedHistory?.numbers?.eighth}</td>
                </tr>
              </tbody>
            )
          }
        </table>
        {
          currentGameType.value !== "mega" ? (
            <table className="table_section">
              <tbody>
                <tr className="table_row">
                  <th>{t("result_table.head")}</th>
                  <th>{t("result_table.tail")}</th>
                </tr>
                <tr className="table_row">
                  <td>0</td>
                  <td>2, 7, 4, 6</td>
                </tr>
                <tr className="table_row">
                  <td>1</td>
                  <td>4, 2, 8, 2</td>
                </tr>
                <tr className="table_row">
                  <td>2</td>
                  <td>0, 7</td>
                </tr>
                <tr className="table_row">
                  <td>4</td>
                  <td>2, 9, 8</td>
                </tr>
                <tr className="table_row">
                  <td>5</td>
                  <td>8</td>
                </tr>
                <tr className="table_row">
                  <td>6</td>
                  <td>8</td>
                </tr>
                <tr className="table_row">
                  <td>7</td>
                  <td>8</td>
                </tr>
                <tr className="table_row">
                  <td>8</td>
                  <td>4, 2</td>
                </tr>
                <tr className="table_row">
                  <td>9</td>
                  <td>3, 1, 5, 7</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="mega_section table_area">
              <table className="table_section ">
                <tbody>
                  {
                    gameResults.map((item, index) => (
                      <tr className="table_row" key={`INDEX_RESULT_${index}`}>
                        <td>
                          <span className="td_section">
                            {createDate(item.endTime)}
                          </span>
                        </td>
                        <td>
                          <span className="td_section">
                            {Object.keys(item.numbers).map((e, i) => (
                              <span className="number_small" key={`RESULT_NUM_${i}`}>{item.numbers[e]}</span>
                            ))}
                          </span>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ResultTable;
