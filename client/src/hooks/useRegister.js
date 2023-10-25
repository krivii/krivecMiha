//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import {useState, useContext} from "react";
import { useAuthContext } from "./useAuthContext";


export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (name, email, password) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password})
        })

        const json = await response.json();

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        } 
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({type: "LOGIN", payload: json});

            setIsLoading(false);
        }
    }

    return {signup, isLoading, error};
}