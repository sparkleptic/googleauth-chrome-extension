import React from 'react';
import {render} from 'react-dom';

import App from './components/app/App';

import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux';

// const proxyStore = new Store({
//   portName: 'example'
// });

const mystore = new Store({
  portName: 'sparkstore'
});

mystore.ready().then(() => {
  render(
     <Provider store={mystore}><App /></Provider>
    ,document.getElementById('app'));
});