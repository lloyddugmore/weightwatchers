import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { ComboChart } from "../chart/comboChart";
import { getAnalytics, logEvent } from "firebase/analytics";


const FormComponent = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const [ value, setValue ] = useState("");
    const onSubmit = data => setValue(data);
    const analytics = getAnalytics();
    logEvent(analytics, 'Formpage loaded');

    console.log(watch("name"));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Enter a new weight result here</h2>
            <input defaultValue="test" {...register("name")}/>
            <input {...register("weight", {required: true})}></input>
            {errors.weight && <span>This field is required</span>}

            <input type="submit"/>

            <ComboChart input={value}></ComboChart>
        </form>
    );
}

export { FormComponent };