import React, {useEffect} from 'react';
import App, {Container} from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../app/assets/scss/style.scss';
import Layout from '../app/layouts/Layout';

export default class RootApp extends App {
  render() {
    const {Component, ...other} = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Lottery</title>
          <meta charSet="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
          <meta name="description" content="lottery" />
          <meta name="keywords" content="nextjs, sonicx, lottery, lotto, power ball, react" />
        </Head>
        <CssBaseline />
        <Layout>
          <Component {...other} />
        </Layout>
      </React.Fragment>
    );
  }
}
