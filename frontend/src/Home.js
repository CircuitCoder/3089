import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { refresh } from './store/actions';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const mapS2P = state => ({
  data: state.data,
});

const mapD2P = dispatch => ({
  doRefresh: () => dispatch(refresh()),
});

const styles = makeStyles(theme => ({
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
}));

function Home({ doRefresh, data }) {
  const cls = styles();

  useEffect(() => {
    doRefresh();
  }, []);

  return <>
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
              { data.current ? data.current.title : <i>Currently Empty</i> }
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
                <ListItemIcon><Icon>event</Icon></ListItemIcon>
                <ListItemText primary={e.title} secondary={`${new Date(e.from)} - ${new Date(e.to)}`} />
              </ListItem>) }
            </List>
          </CardContent>
        </Card>
        </> : <CircularProgress></CircularProgress> }
      </div>
  </>;
}
export default connect(mapS2P, mapD2P)(Home);
