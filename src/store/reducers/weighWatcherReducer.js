import * as actionTypes from '../actions/actionTypes';

const initialState = {
    weights: null,
    error: false
}

const weightWatcher = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_WEIGHTS:
            return {
                ...state,
                weights: {
                    ...state.weights
                }
            };
        case actionTypes.FETCH_WEIGHTS:
            return {
                ...state,
                weights: action.weights,
                error: false
            };
        case actionTypes.FETCH_WEIGHTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default weightWatcher;