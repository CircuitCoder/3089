import React, { useState } from 'react';

import { connect } from 'react-redux';

import { fakeLogin } from './store/actions';

const mapS2P = state => ({
  user: state.user,
});

const mapD2P = dispatch => ({
  doLogin: dispatch(fakeLogin()),
});

function Root() {
  return <div>Hi</div>
}

export default connect(mapS2P, mapD2P)(Root);
