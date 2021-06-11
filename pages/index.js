import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useState, useEffect} from 'react'
import Button from '../app/components/Button';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Slider from '../app/containers/Slider';
import Advertiser from '../app/containers/Advertiser';
import ResultTable from '../app/containers/ResultTable';
import BetContentTable from '../app/containers/BetContentTable';
import BetHistoryTable from '../app/containers/BetHistoryTable';
const App = props => {
  const router = useRouter();
  useEffect(() => {
    router.push('northern/northern-lottery');
  }, [])
  
  
  return (
    <></>
  );
}

export default App;