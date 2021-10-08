import React from 'react';
import {data} from '../data';
import { addMovies } from '../actions';
import Navbar from './Navbar';
import MovieCard from './MovieCard';

class App extends React.Component {

  componentDidMount() {
    //normally -> 1.make api call 2.dispatch action
    const {store}= this.props;

    store.subscribe(()=> {
      console.log('UPDATED');
      this.forceUpdate();
    });

    store.dispatch(addMovies(data));

    console.log('STATE: ', store.getState());
  }

  render() {
    console.log('RENDER', this.props.store.getState());
    const {list} = this.props.store.getState();
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs" >
            <div className = "tab" >Movies</div>
            <div className = "tab" >Favourites</div>
          </div>
  
          <div className="list">
            {
              list.map((movie, index)=> {
                return <MovieCard movie={movie} key={`movies-${index}`}/>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
