import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { create } from './store/actions';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { KeyboardDateTimePicker } from '@material-ui/pickers'

const mapS2P = state => ({
});

const mapD2P = dispatch => ({
  doCreate: payload => dispatch(create(payload)),
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

  row: {
    display: 'flex',
    justifyContent: 'center',

    '& > *': {
      flex: 1,
      marginRight: theme.spacing(2),

      '&:last-child': {
        marginRight: 0,
      },
    }
  },
}));

function Add({ doCreate }) {
  const cls = styles();

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrow1h = new Date(now);
  tomorrow1h.setHours(now.getHours() + 25);

  const [title, setTitle] = useState('');
  const [from, setFrom] = useState(tomorrow);
  const [to, setTo] = useState(tomorrow1h);

  const changeTitle = useCallback(ev => {
    setTitle(ev.target.value);
  }, []);

  const doSubmit = useCallback(() => {
    doCreate({ from, to, title });
  }, [title, from, to]);

  return <>
    <div className={cls.heading}>
      <Typography className={cls.headingText} variant="h3" color="textSecondary" gutterBottom>Add</Typography>
    </div>
    <div className={cls.cards}>
      <Card className={cls.card}>
        <CardContent>
          <TextField
            margin="normal"
            onChange={changeTitle}
            value={title}
            variant="filled"
            label="Title"
            fullWidth
          />
          <div className={cls.row}>
            <KeyboardDateTimePicker
              label="From"
              inputVariant="outlined"
              value={from}
              onChange={setFrom}
              maxDate={to}
              margin="normal"
            />

            <KeyboardDateTimePicker
              label="To"
              inputVariant="outlined"
              value={to}
              onChange={setTo}
              minDate={from}
              margin="normal"
            />
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={doSubmit} disabled={!title || from >= to}>Submit</Button>
        </CardActions>
      </Card>
    </div>
  </>;
}
export default connect(mapS2P, mapD2P)(Add);
