//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();


    const logout = () => {
        localStorage.removeItem('user');

        dispatch({type: 'LOGOUT'})

    }

    return {logout};
}