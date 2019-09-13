import React from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import pink from '@material-ui/core/colors/pink';

import { buildStore } from './store';

import Root from './Root';

const store = buildStore();

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: pink,
  },
});

function App() {
  return <ReduxProvider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <Root></Root>
      </ThemeProvider>
    </Router>
  </ReduxProvider>
}

export default App;
