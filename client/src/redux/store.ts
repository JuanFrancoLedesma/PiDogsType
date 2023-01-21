import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import dogReducer from "./storeDog/dogSlice"
import temperamentReducer from "./storeTemperament/temperamentSlice"


export const store = configureStore({
    reducer: {
        dogs: dogReducer,
        temperaments: temperamentReducer
    }
})

export const useAppDispatch:()=>typeof store.dispatch=useDispatch;

export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector


// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch