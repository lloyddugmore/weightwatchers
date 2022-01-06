import * as actionTypes from './actionTypes';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

//this is an async call.... using thunk as it will reach out to firebase DB
export const setWeights = (weights, userWeights) => {
    return {
        type: actionTypes.SET_WEIGHTS,
        weights: weights,
        userWeights: userWeights
    };
};

export const fetchWeightsFailed = () => {
    return {
        type: actionTypes.FETCH_WEIGHTS_FAILED,
    }
}

export const initWeights = () => async(dispatch) => {
    const db = getFirestore();
    const colRef = collection(db, 'weights');
    getDocs(colRef)
    .then((snapshot) => {
        let weights = [];
        snapshot.docs.forEach((doc) => {
            weights.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setWeights(weights, weights));
    })
    .catch(err => {
        console.log(err);
    });
};

export const addWeight = (weight) => {
    return {
        type: actionTypes.ADD_WEIGHTS,
        weight: weight
    };
};