import * as actionTypes from './actionTypes';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

//this is an async call.... using thunk as it will reach out to firebase DB
const setWeights = (weights, userWeights) => {
    return {
        type: actionTypes.SET_WEIGHTS,
        weights: weights,
        userWeights: userWeights
    };
};

const errorOccurred = (error) => {
    return {
        type: actionTypes.ERROR,
        errorMessage: error
    }
}

export const initWeights = () => {
    return dispatch => {
        const db = getFirestore();
        const colRef = collection(db, 'weights');
        getDocs(colRef)
        .then((snapshot) => {
            let weights = [];
            let userWeights = [];
            snapshot.docs.forEach((doc) => {
                weights.push({ ...doc.data(), id: doc.id });

                //TODO: figure out how to get logged in user when auth is implemented so that we can get the below right
                //need a way of saving the logged in users id to the firestore in the weight document.
                if (doc.id === '1xxjZ6IRtBmS7g8glD6T') {
                    userWeights.push({ ...doc.data(), id: doc.id });
                }
            });
            dispatch(setWeights(weights, userWeights));
        })
        .catch(err => {
            console.log(err);
            dispatch(errorOccurred(err));
        });
    }
};

export const addWeight = (data, userWeights) => {
    return dispatch => {
        const db = getFirestore();
        const docRef = doc(db, 'weights', userWeights[0].id);
        const item = {entry: userWeights[0].readings.length + 1, reading: data.weight};
        let newReadings = [
            ...userWeights[0].readings
        ];
        newReadings.push(item);
        userWeights[0].readings = newReadings;

        updateDoc(docRef, userWeights[0]).then(() => {
            dispatch(initWeights())
        });
    }
};