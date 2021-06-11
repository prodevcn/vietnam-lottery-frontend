import React, {useState, useEffect} from 'react';
import Button from "../../components/Button";
import BetContentTable from '../BetContentTable';
import _ from 'lodash';

const Score = props => {
    const [state_dozen, setDozenState] = useState([false, false, false, false, false, false, false, false, false, false]);
    const [state_unit, setUnitState] = useState([false, false, false, false, false, false, false, false, false, false]);
    /* set numbers dozen*/
    const setDozenAll = () => {
        setDozenState([true, true, true, true, true, true, true, true, true, true]);
    };
    const clearDozenAll = () => {
        setDozenState([false, false, false, false, false, false, false, false, false, false]);
    };

    const updateDozen = (index) => {
        setDozenState(prevDozen => {
        const list = prevDozen.map((e, i) => { if (i == index) return !e; return e; });
        return list;
        })
    };

    /* set numbers unit */
    const setUnitAll = () => {
        setUnitState([true, true, true, true, true, true, true, true, true, true]);
    };
    const clearUnitAll = () => {
        setUnitState([false, false, false, false, false, false, false, false, false, false]);
    };
    const updateUnit = (index) => {
        setUnitState(prevUnit => {
        const list = prevUnit.map((e, i) => { if (i == index) return !e; return e; });
        return list;
        })
    };

    return(
        <div>
            <div className="row">
                <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-xl-2 col-ls-2 col-md-3 col-sm-12 col-12">
                            <Button title="Lot2 Numbers" />
                        </div>
                        <div className="col-xl-2 col-ls-2 col-md-3 col-sm-12 col-12">
                            <Button title="Lot2 First Number" />
                        </div>
                        <div className="col-xl-2 col-ls-2 col-md-3 col-sm-12 col-12">
                            <Button title="Lot2 Number 1K" />
                        </div>
                        <div className="col-xl-2 col-ls-2 col-md-3 col-sm-12 col-12">
                            <Button title="Lot2 Number 3" />
                        </div>
                        <div className="col-xl-2 col-ls-2 col-md-3 col-sm-12 col-12">
                            <Button title="Lot2 Number 4" />
                        </div>
                    </div>
                    <p className="page_description">
                        Type the last 2-digit lot in the 27 lots of the North prize draw. Paying only VND 27,000 per point, the winnings for each point is VND 99,000. In the case of winning 2 or more lots, the winning amount will be multiplied accordingly.
                    </p>
                    <div className="row">
                        <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 vertical-center">
                            <div className="row flex-between">
                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-2">
                                    <p style={{color: '#ff8801', marginBottom: 0,}}>Dozen</p>
                                </div>
                                {_.range(10).map((index) => {
                                    return(
                                    <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 bet_button" key={index}>
                                        <button className={state_dozen[index] ? "number_button active" : "number_button"} onClick={() => {updateDozen(index)}}>{index}</button>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                    <Button title="All" selected={true} onClick={() => {setDozenAll();}} />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                    <Button title="Show" selected={true} />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                    <Button title="Delete" selected={true} onClick={() => {clearDozenAll();}} />
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 vertical-center">
                            <div className="row flex-between">
                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                                    <p style={{color: '#ff8801', marginBottom: 0,}}>Unit</p>
                                </div>
                                {([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).map((index) => {
                                    return(
                                    <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 bet_button" key={index}>
                                        <button className={state_unit[index] ? "number_button active" : "number_button"} onClick={() => {updateUnit(index)}}>{index}</button>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                    <Button title="All" selected={true} onClick={() => {setUnitAll();}} />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                    <Button title="Show" selected={true} />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                    <Button title="Delete" selected={true} onClick={() => {clearUnitAll();}} />
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 row_center">
                            <label style={{color: '#ddd'}}>
                            Multiple First &nbsp;
                            <input type="text" name="name" className="multiple_first" value={"2"} onChange={() => {console.log('3')}} />
                            </label>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-xl-2 offset-xl-3 col-lg-2 offset-lg-3 col-md-4 col-sm-4 col-4 off-set">
                            <Button title="Quick" selected={true} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-4">
                            <Button title="Reset" selected={true} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-4">
                            <Button title="Move" selected={true} />
                        </div>     
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12">
                    <Button title="Select Number" selected={true}/>
                    <Button title ="Enter Number" />
                    <Button title="Quick Number" />
                    <Button title="Odd of 1 to 99" />
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <BetContentTable />
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 align-items-center">
                    <p className="date_text">Total state is 0 VND</p>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                    <Button title="Feed" />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <Button title="Place a bet Time remaining: 0" selected={true} />
                </div>
            </div>
        </div>
    );
}

export default Score;