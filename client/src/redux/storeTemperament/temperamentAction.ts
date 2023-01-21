import { Dispatch } from "redux";
import axios from "axios";

import { getAllTemperaments } from "./temperamentSlice";

export const getTemperaments = () => {
    return async (dispatch : Dispatch) => {
        const json = await axios.get("/temperament")
        return dispatch(getAllTemperaments(json.data))
    }
}