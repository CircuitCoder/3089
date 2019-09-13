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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const mapS2P = state => ({
  user: state.user,
  data: state.data,
});

const mapD2P = dispatch => ({
  doLogin: () => dispatch(fakeLogin()),
  doRefresh: () => dispatch(refresh()),
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

  heading: {
    display: 'flex',
    alignItems: 'center',
  },

  headingText: {
    flex: 1,
  },

  cards: {
    display: 'flex',
    justifyContent: 'center',
  },

  card: {
    flex: 1,
    marginRight: theme.spacing(2),

    '&:last-child': {
      marginRight: 0,
    },
  },

  subtitle: {
  },

  toolbarSpacer: { ...theme.mixins.toolbar },
}));

function Root({ doLogin, doRefresh, user, data }) {
  const cls = styles();

  useEffect(() => {
    doRefresh();
  }, []);

  return <div>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" className={cls.menuButton} color="inherit" aria-label="menu">
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h6" className={cls.title}>
          3089
        </Typography>
        { user ? <IconButton color="inherit"><Icon>add</Icon></IconButton> : <Button onClick={doLogin} color="inherit">Login</Button> }
      </Toolbar>
    </AppBar>

    <div className={cls.toolbarSpacer}>Hidden Info!</div>
    <div className={cls.content}>
      <div className={cls.heading}>
        <Typography className={cls.headingText} variant="h3" color="textSecondary" gutterBottom>Usage</Typography>
        <IconButton onClick={doRefresh}><Icon>refresh</Icon></IconButton>
      </div>
      <div className={cls.cards}>
        { data ? <>
          <Card className={cls.card}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                Currently
              </Typography>
              <Typography variant="h5">
                { data.current ? data.current.title : 'Currently Empty' }
              </Typography>
            </CardContent>
          </Card>
          <Card className={cls.card}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                Next up
              </Typography>

              <List>
                { data.nextUp.map(e => <ListItem key={e._id}>
                  <ListItemText primary={e.title} />
                </ListItem>) }
              </List>
            </CardContent>
          </Card>
        </> : <CircularProgress></CircularProgress> }
      </div>
    </div>
  </div>;
}

export default connect(mapS2P, mapD2P)(Root);
