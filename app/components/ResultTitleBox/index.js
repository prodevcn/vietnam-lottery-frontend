import React from 'react';

const ResultTitleBox = props => (
        <div className="title__container">
            <div className="title__box">
                <div className="title__name">{props.name}</div>
                <div className="title__date">{props.date}</div>
            </div>
            <div className="title__number">
                {
                    props.number?.split('').map((item, index) => (
                        <div className="number__box" key={`RESULT_NUMBER_${index}`}>{item}</div>
                    ))
                }       
            </div>
        </div>
    );

export default ResultTitleBox;