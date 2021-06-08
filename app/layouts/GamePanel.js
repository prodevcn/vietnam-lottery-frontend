import React, {useState, useEffect} from 'react';
const GamePanelLayout = props => {
    useEffect(() => {
        console.log(props.children);
    }, []);
    return (
        <div className="about__dgtaka about--2 section-padding--xl">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-xl-9 col-md-12 col-sm-12 col-12">
                        {props.children[0]}
                    </div>
                    <div className="col-lg-4 col-xl-3 col-md-12 col-sm-12 col-12 col-12">
                        {props.children[2]}
                        <br></br>
                        {props.children[3]}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        {props.children[4]}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamePanelLayout;