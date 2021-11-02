import { combineReducers } from "redux";

import { ADD_MOVIES , ADD_FAVOURITE, REMOVE_FAVOURITE, SET_SHOW_FAVOURITES} from "../actions";

const initialMoviesState = {
    list : [],
    favourites: [],
    showFavourites :false
}

export function movies(state=initialMoviesState, action) { //by def state -> an empty obj
    // if(action.type === ADD_MOVIES) {
    //     return {
    //         ...state,
    //         list: action.movies
    //     };
    // }

    // return state;
    switch(action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            };
        
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites : [action.movie, ...state.favourites]
            }

        case REMOVE_FAVOURITE:
            return {
                ...state,
                favourites : state.favourites.filter(favourite => favourite !== action.movie)
            }
        
        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites : action.val
            }
        default:
            return state
    }
}

const initialSearchState = {
    result : {}
};
export function search(state = initialSearchState, action) {
    return state;
}

// const initialRootState = {
//     movies : initialMoviesState,
//     search : initialSearchState
// }
// export default function rootReducer(state = initialRootState, action) {
//     return {
//         movies: movies(state.movies, action),
//         search: search(state.search, action)
//     }
// }

//smart enough to do as above only !
// export default combineReducers({
//   movies:movies, //propertyWeWant: ReducerWhichWillHandleThat
//   search:search,
// });

//shorthand
export default combineReducers({
    movies,
    search
});