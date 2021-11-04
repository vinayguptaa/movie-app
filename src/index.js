import React, { createContext } from 'react';
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

export const StoreContext = createContext();
console.log('StoreContext: ' ,StoreContext);

class Provider extends React.Component {
  render() {
    const {store} = this.props;
    return  <StoreContext.Provider value={store}> {this.props.children} </StoreContext.Provider>
  }
}

//example call --->> const ConnectedAppComponent = connect(callback)(App);
export function connect(callback) {
  return function(Component) {
    class ConnectedComponent extends React.Component{
      constructor(props) {
        super(props);
        //this returns unsubscribe function which we should call when component is destroyed to avoid data leaks !
        //like we do while attaching event handlers and detatch when when element destroys
        this.unsubscribe = this.props.store.subscribe(()=> this.forceUpdate());
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const {store} = this.props;
        const state = store.getState();
        const dataToBePassedAsProps = callback(state);
        // here using spread operator means exact same as passing props like let's say request was like {movies: state.movies}
        //then it will do like movies = {state.movies}
        return <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
      }
    }

    //creating a wrapper as we want to use subsribe above which will require store access
    class ConnectedComponentWrapper extends React.Component {
      render() {
        return <StoreContext.Consumer>
          {(store)  => <ConnectedComponent store={store} />}
        </StoreContext.Consumer>
      }
    }

    return ConnectedComponentWrapper;
  }
}


// console.log('state: ', store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: ['Superman']
// });

// console.log('state: ', store.getState());

// ReactDOM.render(
//   <StoreContext.Provider value={store}>
//     <App store={store} /> //will remove this from here as using context
//   </StoreContext.Provider> ,
//   document.getElementById('root')
// );

ReactDOM.render(
  //as it is our own component we cab use store as prop name
  <Provider store={store}> 
    <App />
  </Provider> ,
  document.getElementById('root')
);

