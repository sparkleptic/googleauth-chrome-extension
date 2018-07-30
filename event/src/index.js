import {createStore} from 'redux';
import allReducers from './reducers';

import {wrapStore} from 'react-chrome-redux';

// const store = createStore(allReducers, {});

// wrapStore(store, {
//   portName: 'example'
// });

const mystore = createStore(allReducers);

wrapStore(mystore, {
  portName: 'sparkstore'
});