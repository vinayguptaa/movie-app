import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

//we are making logger to get action type whenever an action is dispatched !
//redux will call it like : logger(obj)(next)(action)
// const logger = function({dispatch, getState}) { //rudux passes obj with dispatch and getState
//   return function(next) {
//     return function(action) {
//       //middleware code
//       console.log('ACTION TYPE: ',action.type);
//       next(action);
//     }
//   }
// }

//same as above
const logger= ({dispatch, getState}) => (next) => (action) => {
  //middleware code
  if (typeof action !== 'function') {
    console.log('ACTION TYPE: ',action.type);
  }
  next(action);
}

//exactly same as importing thunk
// const thunk = store => next => action => {
//   if (typeof action === 'function') {
//     return action(store.dispatch);
//   }

//   next(action);
// };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
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

