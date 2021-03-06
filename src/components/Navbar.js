import React from 'react';
import { addMovieToList, handleMovieSearch } from '../actions';
import { connect } from 'react-redux';

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
    if(searchText !== '') {
      this.props.dispatch(handleMovieSearch(searchText));
    }
  };

  handleSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { showSearchResults, results: movies } = this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleSearchChange}/>
          <button id="search-btn" onClick={this.handleSearchClick}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div style={styles.escDiv}>Press <span style={styles.escDivSpan}>esc</span> to exit</div>
              {
                movies.map((movie, index) => {
                  return (
                  <div className="search-result" key={`movies-${index}`} >
                    <img src={movie.Poster} alt="search-pic" />
                    <div className="movie-info">
                      <span>{movie.Title}</span>
                      <button onClick={() => this.handleAddToMovies(movie)}>
                        Add to Movies
                      </button>
                    </div>
                  </div> )
                })
              }
            </div>
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  escDiv : {
    width : 'auto',
    backgroundColor: 'gray',
    padding: 10,
    textAlign : 'center',
    color: 'white'
  },
  escDivSpan :{
    padding: '3px 4px',
    border: '1px solid',
    borderRadius: '4px',
    margin : '0 2px'
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