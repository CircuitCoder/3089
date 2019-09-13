import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { fakeLogin, refresh } from './store/actions';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { Route, Link } from 'react-router-dom'

import Home from './Home';

const mapS2P = state => ({
  user: state.user,
});

const mapD2P = dispatch => ({
  doLogin: () => dispatch(fakeLogin()),
});

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  content: {
    maxWidth: 760,
    padding: '40px 30px',
    margin: '0 auto',
  },

  toolbarSpacer: { ...theme.mixins.toolbar },
}));

function Root({ doLogin, user }) {
  const cls = styles();

  return <div>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" className={cls.menuButton} color="inherit" aria-label="menu">
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h6" className={cls.title}>
          3089
        </Typography>
        { user ? <Link to="/add"><IconButton color="inherit"><Icon>add</Icon></IconButton></Link> : <Button onClick={doLogin} color="inherit">Login</Button> }
      </Toolbar>
    </AppBar>

    <div className={cls.toolbarSpacer}>Hidden Info!</div>
    <div className={cls.content}>
      <Route path="/" exact component={Home} />
    </div>
  </div>;
}

export default connect(mapS2P, mapD2P)(Root);
