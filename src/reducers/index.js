import { ADD_MOVIES } from "../actions";

const initialMoviesState = {
    list : [],
    fovourites: []
}

export default function movies(state=initialMoviesState, action) { //by def state -> an empty obj
    if(action.type === ADD_MOVIES) {
        return {
            ...state,
            list: action.movies
        };
    }

    return state;
}