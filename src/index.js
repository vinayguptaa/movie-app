import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

const logger = function({dispatch, getState}) {
  return function(next) {
    return function(action) {
      //middleware code
      console.log('ACTION TYPE: ',action.type);
      next(action);
    }
  }
}

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('creating store: ', store);
// console.log('state: ', store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: ['Superman']
// });

// console.log('state: ', store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);

