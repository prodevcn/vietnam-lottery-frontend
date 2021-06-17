import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import Dropdown from '../../components/Dropdown';

const DATA = [
    {
        date: "2021-06-22",
        results: "12345-12451-32512-12351-12352",
    },
    {
        date: "2021-06-21",
        results: "12345-12451-32512-12351-12352",
    },
    {
        date: "2021-06-20",
        results: "12345-12451-32512-12351-12352",
    },
    {
        date: "2021-06-19",
        results: "12345-12451-32512-12351-12352",
    }
];


const ResultTable = props => {
    const {t} = useTranslation();
    const [date, setDate] = useState(DATA[0].date);

    const getDates = (data) => {
        return data.map(item => {
            return item.date;
        });
    };

    const onChangeProcess = (val) => {
        console.log(val);
        setDate(val);
    };

    return(
        <div className="betting_table">
            <div className="table_container">
                <h5 className="result_text">{props.title} {t("lottery_result")}</h5>
                <Dropdown 
                    value={date} 
                    data={getDates(DATA)}
                    onChange={(target) => {onChangeProcess(target)}}
                />
                <p className="result_title">
                    {t("result_table.result")} : {date}
                </p>
                <table className="table_section">
                   <tbody>
                        <tr className="table_row">
                            <td>{t("result_table.red_award")}</td>
                            <td>sss</td>
                        </tr>
                        <tr className="table_row">
                            <td>{t("result_table.first_prize")}</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>{t("result_table.second_prize")}</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>{t("result_table.third_prize")}</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>{t("result_table.fourth_prize")}</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>{t("result_table.fifth_prize")}</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>{t("result_table.sixth_prize")}</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>{t("result_table.seventh_prize")}</td>
                            <td></td>
                        </tr>
                   </tbody>
                </table>

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
                            <td>8</td>
                            <td>4, 2</td>
                        </tr>
                        <tr className="table_row">
                            <td>9</td>
                            <td>3, 1, 5, 7</td>
                        </tr>
                   </tbody>
                </table>
            </div>
        </div>
    );    
}

export default ResultTable;

