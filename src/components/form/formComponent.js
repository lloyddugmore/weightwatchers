import React from "react";
import { useDispatch, useSelector} from 'react-redux';

import { useForm } from "react-hook-form";
import { ComboChart } from "../chart/comboChart";
import { getAnalytics, logEvent } from "firebase/analytics";
import * as actions from '../../store/actions/index';
import { ErrorComponent } from "../error/errorComponent";

import styles from './formComponent.module.scss';

const FormComponent = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const analytics = getAnalytics();
    logEvent(analytics, 'Weight Entry Page Loaded');

    const dispatch = useDispatch()
    const userWeights = useSelector(state => state.weightWatcher.userWeights);
    const onSubmit = (data) => {
        logEvent(analytics, 'Weight Submitted By User');
        dispatch(actions.addWeight(data, userWeights));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Weight Watcher</h2>
            <div className="content">
                <div className="columns">
                    <div className="column is-one-third">
                        <input placeholder="Enter your most recent weight..."
                            type="number"
                            className={styles["wideInput"]}
                            {...register("weight", {required: true, min: 0, max: 250})}>
                        </input>
                    </div>
                    <div className="column">
                        <input type="submit" value="Save"></input>
                    </div>
                </div>
            </div>
            <ErrorComponent error={errors}></ErrorComponent>
            <ComboChart></ComboChart>
        </form>
    );
}

export { FormComponent };