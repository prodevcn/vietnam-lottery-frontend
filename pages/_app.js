import React, {useEffect} from 'react';
import App, {Container} from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Provider} from 'react-redux';

import i18n from '../app/i18n';
import store from '../app/redux/store';

import '../app/assets/scss/style.scss';


export default class RootApp extends App {
  async componentDidMount() {
    const lang = await localStorage.getItem('lang');
    i18n.changeLanguage(lang);
  }

  render() {
    const {Component, ...other} = this.props;
    return (
      <React.Fragment>
        <Provider store={store}>
          <Head>
            <title>Lottery</title>
            <meta charSet="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
            <meta name="description" content="lottery" />
            <meta name="keywords" content="sonicx, lottery, lotto, power ball, react, sox" />
            <link rel="icon" href="/images/lottery.png" />
          </Head>
          <CssBaseline />
          <Component {...other} />
        </Provider>
      </React.Fragment>
    );
  }
}
