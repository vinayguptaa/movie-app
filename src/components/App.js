import React from 'react';
import {data} from '../data';
import { addMovies, setShowFavourites, hideSearchResult } from '../actions';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { connect } from 'react-redux';

class App extends React.Component {

  componentDidMount() {
    //normally -> 1.make api call 2.dispatch action

    this.props.dispatch(addMovies(data));

    // console.log('STATE: ', store.getState());
  }

  isMovieFavourite = (movie) => {
    const {movies} = this.props;

    let index = movies.favourites.indexOf(movie);
    if(index !== -1) {
      //found movie
      return true;
    }

    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  }

  //doing in myself to hide search on escape
  handleHideSearchResult = (e) => {
    if(e.key === 'Escape') {
      console.log(e.key);
      this.props.dispatch(hideSearchResult());
    }
    // console.log(e.key);
  }
 
  render() {
    // console.log('RENDER', this.props.store.getState());//  state -->> {movies: {}, search: {}}

    const {movies} = this.props;
    const {list, favourites, showFavourites} = movies;

    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App" tabIndex="0" onKeyDown={this.handleHideSearchResult} >
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

// class AppWrapper extends React.Component {
//   render () {
//     return (
//       <StoreContext.Consumer>
//         {
//           (store) => <App store={store} ></App>
//         }
//       </StoreContext.Consumer>
//     )
//   }
// }

//react community uses such name : mapStateToProps
function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search
  }
}

const ConnectedAppComponent = connect(mapStateToProps)(App);

export default ConnectedAppComponent;