import React, {useState, useEffect} from 'react';
import GamePanel from '../../app/layouts/GamePanel';
import GameTabs from '../../app/layouts/GameTabs';

import Slider from '../../app/containers/Slider';
import Advertiser from '../../app/containers/Advertiser';
import ResultTable from '../../app/containers/ResultTable';
import BetHistoryTable from '../../app/containers/BetHistoryTable';




const NorthernLottery = props => {
    return (
        <GamePanel>
            <Slider />
            <GameTabs />
            <ResultTable title="Hanoi VIP Lottery Results" />            
            <Advertiser />
            <BetHistoryTable />
        </GamePanel>
    );
};

export default NorthernLottery;