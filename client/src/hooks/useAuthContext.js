//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import {useContext} from "react";
import { AuthContext } from "../context/AuthContext";


export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context){
        throw Error("useAuthContext must be inside AuthContextProvider");
    }

    return context;
}

