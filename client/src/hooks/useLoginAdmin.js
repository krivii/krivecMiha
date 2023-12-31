//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import {useState} from "react";
import { useAuthContext } from "./useAuthContext";


export const useLoginAdmin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
  
    const loginAdmin = async (email, password, role, securityKey) => {
      setIsLoading(true);
      setError(null);
  

      try {
        const response = await fetch("http://localhost:3001/api/auth/adminLogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email, password, role, securityKey})
        });
  
        const json = await response.json();
        console.log(json)
  
        if (!response.ok) {
          setIsLoading(false);
          setError(json.error);
        } else {
          localStorage.setItem("user", JSON.stringify(json));
          dispatch({ type: "LOGIN", payload: json });
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setError("An error occurred while logging in.");
      }
    };
  
    return { loginAdmin, isLoading, error };
  };
  