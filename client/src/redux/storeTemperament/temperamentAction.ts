import { Dispatch } from "redux";
import axios from "axios";

import { getAllTemperaments } from "./temperamentSlice";

export const getTemperaments = () => {
    return async (dispatch : Dispatch) => {
        const json = await axios.get("http://localhost:3001/temperament")
        return dispatch(getAllTemperaments(json.data))
    }
}