import React from 'react';
import {addFavourite, removeFavourite} from '../actions';
import { StoreContext } from '..';

class MovieCard extends React.Component {
    handleFavouriteClick = () => {
        let {movie}  = this.props;
        this.props.dispatch(addFavourite(movie));
    }

    handleUnFavouriteClick = () => {
        let {movie}  = this.props;
        // this.props.isFavourite = false;
        this.props.dispatch(removeFavourite(movie));
    }

    render() {
        const {movie, isFavourite} = this.props;
        return(
            <div className="movie-card">
                <div className="left">
                    <img alt = "Movie Poster" src = {movie.Poster} />
                </div>
                <div className="right">
                    <div className="title"> {movie.Title} </div>
                    <div className="plot"> {movie.Plot} </div>
                    <div className="footer">
                        <div className="rating"> {movie.imdbRating} </div>
                        {
                            isFavourite
                            ? <button className="unfavourite-btn" onClick={this.handleUnFavouriteClick} >Unfavourite</button>
                            : <button className="favourite-btn" onClick={this.handleFavouriteClick} >Favourite</button>
                        }
                    </div>
                </div>
            </div>
        );
  }
}

// class MovieCardWrapper extends React.Component {
//     render() {
//       return (
//         <StoreContext.Consumer>
//           {
//             (store) => <MovieCard dispatch={store.dispatch} ></MovieCard>
//           }
//         </StoreContext.Consumer>
//       )
//     }
//   }

export default MovieCard;
