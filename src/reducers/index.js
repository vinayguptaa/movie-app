export default function movies(state=[], action) { //by def state -> an emoty array
    if(action.type === 'ADD_MOVIES') {
        return action.movies;
    }

    return state;
}