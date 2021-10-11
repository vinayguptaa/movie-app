import React from 'react';
import {data} from '../data';
import { addMovies, setShowFavourites } from '../actions';
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

  isMovieFavourite = (movie) => {
    const {movies} = this.props.store.getState();

    let index = movies.favourites.indexOf(movie);
    if(index !== -1) {
      //found movie
      return true;
    }

    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }

  render() {
    console.log('RENDER', this.props.store.getState());// {movies: {}, search: {}}

    const {movies} = this.props.store.getState();
    const {list, favourites, showFavourites} = movies;

    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs" >
            <div className = {`tab ${showFavourites ? '' : 'active-tabs' }`} onClick = {() => this.onChangeTab(false)} >Movies</div>
            <div className = {`tab ${showFavourites ? 'active-tabs' : '' }`} onClick = {() => this.onChangeTab(true)} >Favourites</div>
          </div>
  
          {(displayMovies.length===0) ? <div style = { {color:'#444444', marginTop : 6, marginLeft: 4} }> No movies to show...</div> : null }

          <div className="list">
            {
              displayMovies.map((movie, index)=> {
                return <MovieCard 
                          movie={movie} 
                          key={`movies-${index}`} 
                          dispatch={this.props.store.dispatch} 
                          isFavourite = {this.isMovieFavourite(movie)}
                       />
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
