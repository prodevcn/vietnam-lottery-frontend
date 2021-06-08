import React, {useState, useEffect} from 'react';
import Select from '@material-ui/core/Select';
// import {makeSt}
const ResultTable = props => {
    const [time, setTime] = useState('19-02-2021');
    return(
        <div className="betting_table">
            <div className="table_container">
                <h5 className="result_text">{props.title}</h5>
                <div className="date_area">
                    <h5 className="date_text">{time}</h5>
                </div>
                <p className="result_title">
                    Results : {time}
                </p>
                <table className="table_section">
                   <tbody>
                        <tr className="table_row">
                            <td>Delta Prize</td>
                            <td>sss</td>
                        </tr>
                        <tr className="table_row">
                            <td>First Prize</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>The second prize</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>The third prize</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>Fourth prize</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>Fifth prize</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>Sixth prize</td>
                            <td></td>
                        </tr>
                        <tr className="table_row">
                            <td>Seventh prize</td>
                            <td></td>
                        </tr>
                   </tbody>
                </table>

                <table className="table_section">
                   <tbody>
                        <tr className="table_row">
                            <th>Head</th>
                            <th>Tail</th>
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

