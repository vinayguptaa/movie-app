import React from 'react';
import { addMovieToList, handleMovieSearch } from '../actions';
import { connect } from '..';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  };

  handleSearchClick = () => {
    const { searchText } = this.state;
    //we could do the api call here but we should try to seperate our UI and data fetch so do it with actions
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { showSearchResults, results: movie } = this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleSearchChange}/>
          <button id="search-btn" onClick={this.handleSearchClick}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// class NavBarWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {
//           (store) => <Navbar search={store.getState().search} dispatch={store.dispatch} />
//         }
//       </StoreContext.Consumer>
//     )
//   }
// }

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

const ConnectedNavBarComponent =  connect(mapStateToProps)(Navbar);

export default ConnectedNavBarComponent;