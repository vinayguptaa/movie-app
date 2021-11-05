// {
//     type: 'ADD_MOVIES'
//     movies: [m1, m2,..]
// }

//action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';
export const HIDE_SEARCH_RESULT = 'HIDE_SEARCH_RESULT';

//action creators
export function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies
    }
}

export function addFavourite(movie) {
    return {
        type: ADD_FAVOURITE,
        movie
    }
}

export function removeFavourite(movie) {
    return {
        type: REMOVE_FAVOURITE,
        movie
    }
}

export function setShowFavourites(val) {
    return {
        type: SET_SHOW_FAVOURITES,
        val
    }
}

export function addMovieToList(movie) {
    return {
      type: ADD_MOVIE_TO_LIST,
      movie,
    };
}

export function handleMovieSearch(searchText) {
    return function (dispatch) {
        const url = `http://www.omdbapi.com/?apikey=3ca5df7&s=${searchText}`;
        fetch(url)
        .then((response) => response.json())
        .then((movies) => {
            console.log('movies', movies.Search);
            // dispatch action to save search results in store
            dispatch(addMovieSearchResult(movies.Search));
        });
    };
}

export function addMovieSearchResult(movies) {
    return {
        type: ADD_SEARCH_RESULT,
        movies,
    };
}

export function hideSearchResult() {
    return {
        type: 'HIDE_SEARCH_RESULT'
    }
}