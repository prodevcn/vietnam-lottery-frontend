import React, {useState, useEffect} from 'react';

import GamePanel from '../../app/layouts/GamePanel';
import GameTabs from '../../app/layouts/GameTabs';

import Slider from '../../app/containers/Slider';
import Advertiser from '../../app/containers/Advertiser';
import ResultTable from '../../app/containers/ResultTable';
import BetHistoryTable from '../../app/containers/BetHistoryTable';

import Score from '../../app/containers/BetTypes/Score';
import ThreeMore from '../../app/containers/BetTypes/3More';
import FourMore from '../../app/containers/BetTypes/4More';
import Bags from '../../app/containers/BetTypes/Bags';
import LoXian from '../../app/containers/BetTypes/LoXian';
import HeadAndTail from '../../app/containers/BetTypes/HeadAndTail';
import SlidingLot from '../../app/containers/BetTypes/SlidingLot';

const bettingTypes = [
    {
        label: "Bags",
        component: <Bags />,
    },
    {
        label: "Lo Xian",
        component: <LoXian />,
    },
    {
        label: "Score",
        component: <Score />,
    },
    {
        label: "Head and Tail",
        component: <HeadAndTail />,
    },
    {
        label: "3 More",
        component: <ThreeMore />
    },
    {
        label: "4 More",
        component: <FourMore />,
    },
    {
        label: "Sliding Lot",
        component: <SlidingLot />,
    },
]

const NorthernLottery = props => {
    return (
        <GamePanel>
            <Slider />
            <GameTabs bettingTypes = {bettingTypes}/>
            <ResultTable title="Hanoi VIP Lottery Results" />            
            <Advertiser />
            <BetHistoryTable />
        </GamePanel>
    );
};

export default NorthernLottery;