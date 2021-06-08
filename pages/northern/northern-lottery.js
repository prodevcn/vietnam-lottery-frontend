import React, {useState, useEffect} from 'react';
import GamePanelLayout from '../../app/layouts/GamePanel'; 
import Slider from '../../app/components/slider/Slider';
import Advertiser from '../../app/components/advertiser/Advertiser';
import ResultTable from '../../app/containers/ResultTable';
import BetHistoryTable from '../../app/containers/BetHistoryTable';
import GameTabs from './GameTabs';
const NorthernLottery = props => {
    return (
        <GamePanelLayout>
            <Slider />
            <GameTabs />
            <ResultTable title="Hanoi VIP Lottery Results" />            
            <Advertiser />
            <BetHistoryTable />
        </GamePanelLayout>
    );
};

export default NorthernLottery;