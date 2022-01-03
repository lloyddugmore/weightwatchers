import * as actionTypes from './actionTypes';
import db from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore/lite';

//this is an async call.... using thunk as it will reach out to firebase DB
export const setWeights = (weights) => {
    console.log('in set weights');
    return {
        type: actionTypes.SET_WEIGHTS,
        weights: weights
    };
};

export const fetchWeightsFailed = () => {
    return {
        type: actionTypes.FETCH_WEIGHTS_FAILED,
    }
}

export const initWeights = (payload) => async(dispatch) => {

    const weightsCol = collection(db, 'weights');
    const weightSnapshot = await getDocs(weightsCol);
    const weightList = weightSnapshot.docs.map(doc => doc.data());
    console.log(weightList);

    return dispatch => {
        dispatch(setWeights(weightList));
    }

    // const response = db.collection('weights');
    // const data = await response.get();
    // console.log(data);

    // return dispatch => {
    //     axios.get('/weights.json')
    //     .then( response => {
    //         dispatch(setWeights(response.data));
    //     })
    //     .catch( error => {
    //         dispatch(fetchWeightsFailed())
    //     })
    // };
};

export const addWeight = (weight) => {
    return {
        type: actionTypes.ADD_WEIGHTS,
        weight: weight
    };
};