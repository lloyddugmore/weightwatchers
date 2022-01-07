import React, {useState} from "react";
import { useDispatch, useSelector} from 'react-redux';

import { useForm } from "react-hook-form";
import { ComboChart } from "../chart/comboChart";
import { getAnalytics, logEvent } from "firebase/analytics";
import * as actions from '../../store/actions/index';
import { ErrorComponent } from "../error/errorComponent";

const FormComponent = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [ value, setValue ] = useState("");

    const analytics = getAnalytics();
    logEvent(analytics, 'Weight Entry Page Loaded');

    const userWeights = useSelector(state => state.weightWatcher.userWeights);

    const dispatch = useDispatch()
    const onSubmit = (data) => {
        setValue(data);
        logEvent(analytics, 'Weight Submitted By User');
        dispatch(actions.addWeight(data, userWeights));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Weight Watcher</h2>
            <input placeholder="Enter your most recent weight..."
                   type="number"
                   {...register("weight", {required: true, min: 0, max: 250})}>
            </input>
            <input type="submit" value="Save"></input>

            <ErrorComponent error={errors}></ErrorComponent>
            <ComboChart input={value}></ComboChart>
        </form>
    );
}

export { FormComponent };