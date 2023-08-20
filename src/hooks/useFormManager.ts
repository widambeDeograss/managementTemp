import React, { useState } from "react"

export const useFormManager =<T> (initialformState:T) => {
    const [formState, setformState] = useState(initialformState);
    
    const handleformElementChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setformState({
            ...formState,
            [event.target.name]:event.target.value
        });
    }

    const manualChangeHandler = (name: string, value: string) => {
        setformState({
            ...formState,
            [name]:value
        });
    }

    const resetInitialState = () => {setformState(initialformState)}
    const setNewFormState = (newformState:T) => { setformState(newformState)}

    return { formState, handleformElementChange, resetInitialState, setNewFormState, manualChangeHandler };
}