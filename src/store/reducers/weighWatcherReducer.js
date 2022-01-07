import * as actionTypes from '../actions/actionTypes';

const initialState = {
    weights: null,
    userWeights: null,
    error: false
}

const weightWatcher = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_WEIGHTS_FAILED:
            return {
                ...state,
                error: true
            };
        case actionTypes.SET_WEIGHTS:
            return {
                ...state,
                weights: action.weights,
                userWeights: action.userWeights,
                error: false
            };
        default:
            return state;
    }
};

export default weightWatcher;