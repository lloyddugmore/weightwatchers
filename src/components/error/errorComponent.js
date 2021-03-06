import React from "react";
import { useSelector} from 'react-redux';

import { getAnalytics, logEvent } from "firebase/analytics";

import styles from './errorComponent.module.scss';

const ErrorComponent = (errorProp) => {
    const analytics = getAnalytics();
    logEvent(analytics, 'Error encountered');

    const errorsInState = useSelector(state => state.weightWatcher.error);

    return (
        <div className={styles["errorField"]}>
            {errorProp.error.weight?.type === 'required' && <span>This field is required.</span>}
            {errorProp.error.weight?.type === 'max' && <span>Maximum value of 250.</span>}
            {errorProp.error.weight?.type === 'min' && <span>Minimum value of 0.</span>}
            {errorsInState && <span>Error occurred, please try again.</span>}
        </div>
    );
}

export { ErrorComponent };