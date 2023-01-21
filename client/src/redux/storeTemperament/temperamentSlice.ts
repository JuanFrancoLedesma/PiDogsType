import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemperamentState {
    allTemperaments : string[]
}

const initialState: TemperamentState = {
    allTemperaments: [],
}

export const temperamentSlice = createSlice({
    name: "temperament",
    initialState,
    reducers: {
        getAllTemperaments: (state, action: PayloadAction<string[]>)=>{
            state.allTemperaments = action.payload
        }
    }
})

export default temperamentSlice.reducer
export const {
    getAllTemperaments
} = temperamentSlice.actions