import { Dispatch } from "redux";
import axios from "axios";

import { clearDogDetail, filterByTemperaments, getAllDogs, getDogById, getDogByName, orderByAlf, orderByWeight } from "./dogSlice";

export const getDogs = () => {
  return async (dispatch: Dispatch) => {
    const json = await axios.get("http://localhost:3001/dog");
    return dispatch(getAllDogs(json.data));
  };
};

export const getBreedByName = (name:string) => {
  return async (dispatch: Dispatch) => {    
    const json = await axios.get(`http://localhost:3001/dog?name=${name}`)
    return dispatch(getDogByName(json.data))
  };
};

export const getBreedById = (id:string) => {
  return async (dispatch: Dispatch) => {
    const json = await axios.get(`http://localhost:3001/dog/${id}`)
    return dispatch(getDogById(json.data))
  }
}

export const clearBreedDetail = () => {
  return async ( dispatch: Dispatch) => {
    return dispatch(clearDogDetail())
  }
}

export const filterByTemperament = (temperament : string) => {
  return async (dispatch : Dispatch) => {
    return dispatch(filterByTemperaments(temperament))
  }
}

export const orderAlf = (order : string) => {
  return async (dispatch : Dispatch) => {
    return dispatch(orderByAlf(order))
  }
}
export const orderWeight = (order : string) => {
  console.log(order);
  return async (dispatch : Dispatch) => {
    return dispatch(orderByWeight(order))
  }
}