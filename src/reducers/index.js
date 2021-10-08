import { ADD_MOVIES , ADD_FAVOURITE, REMOVE_FAVOURITE} from "../actions";

const initialMoviesState = {
    list : [],
    favourites: []
}

export default function movies(state=initialMoviesState, action) { //by def state -> an empty obj
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
        
        default:
            return state
    }
}