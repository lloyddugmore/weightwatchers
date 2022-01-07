import React, {useState} from "react";
import { useDispatch, useSelector} from 'react-redux';

import { useForm } from "react-hook-form";
import { ComboChart } from "../chart/comboChart";
import { getAnalytics, logEvent } from "firebase/analytics";
import * as actions from '../../store/actions/index';

const FormComponent = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [ value, setValue ] = useState("");
    const onSubmit = data => setValue(data);
    const analytics = getAnalytics();
    logEvent(analytics, 'Formpage loaded');

    const userWeights = useSelector(state => state.weightWatcher.userWeights);

    const dispatch = useDispatch();
    const onWeightAdded = (entry) => {
        //todo work out how to get the values from  the form here... (entry)
        dispatch(actions.addWeight(entry, userWeights));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Enter a new weight result here</h2>
            <input defaultValue="test" {...register("name")}/>
            <input {...register("weight", {required: true})}></input>
            {errors.weight && <span>This field is required</span>}

            <input type="submit"/>
            <button onClick={onWeightAdded}>Press me</button>

            <ComboChart input={value}></ComboChart>
        </form>
    );
}

export { FormComponent };