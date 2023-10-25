//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import {useState} from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (email, password, role) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password, role})
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

    return {login, isLoading, error};
}