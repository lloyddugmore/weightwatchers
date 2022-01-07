import * as actionTypes from '../actions/actionTypes';

const initialState = {
    weights: null,
    userWeights: null,
    error: false
}

const weightWatcher = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage
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