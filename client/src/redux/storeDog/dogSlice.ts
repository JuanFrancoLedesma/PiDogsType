import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DogInterface } from "../../types";
// import type { RootState } from "../store";

interface DogState {
  allBreeds: DogInterface[];
  allBreedsAux: DogInterface[];
  breedDetail: DogInterface;
  temperaments: string[];
  empty: boolean
}

const initialState: DogState = {
  allBreeds: [],
  allBreedsAux: [],
  breedDetail: {
    id: "",
    name: "",
    metric_height: [],
    imperial_height: [],
    metric_weight: [],
    imperial_weight: [],
    metricWeightProm: 0,
    imperialWeightProm: 0,
    life_span: [],
    createdByUser: false,
    image: "",
    temperament: "",
  },
  temperaments: [],
  empty: false
};

export const dogSlice = createSlice({
  name: "dog",
  initialState,
  reducers: {
    getAllDogs: (state, action: PayloadAction<DogInterface[]>) => {
      state.allBreeds = action.payload;
      state.allBreedsAux = state.allBreeds;
    },
    getDogByName: (state, action: PayloadAction<DogInterface[]>) => {
      if(action.payload.length > 0){
        state.allBreeds = action.payload;
      }
      else{
        state.empty= true
        state.allBreeds = action.payload
      }
    },
    getDogById: (state, action: PayloadAction<DogInterface>) => {
      state.breedDetail = action.payload;
    },
    clearDogDetail: (state) => {
      state.breedDetail = {
        id: "",
        name: "",
        metric_height: [],
        imperial_height: [],
        metric_weight: [],
        imperial_weight: [],
        metricWeightProm: 0,
        imperialWeightProm: 0,
        life_span: [],
        createdByUser: false,
        image: "",
        temperament: "",
      };
    },
    filterByTemperaments: (state, action: PayloadAction<string>) => {
      const breeds = state.allBreeds.filter((breed) =>
        breed.temperament.includes(action.payload)
      );
      if(breeds.length > 0){
        state.allBreeds = breeds
      } else{
        state.empty= true
        state.allBreeds = breeds
      }
    },
    orderByAlf: (state, action: PayloadAction<string>) => {
      action.payload === "ABC"
        ? (state.allBreeds = state.allBreeds.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
            return 0;
          }))
        : (state.allBreeds = state.allBreeds.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
            return 0;
          }));
    },
    orderByWeight: (state, action: PayloadAction<string>) => {
      console.log("Entre al reducer");
      
      action.payload === "ASC"
        ? (state.allBreeds = state.allBreeds.sort((a, b) => {
            if (a.metricWeightProm > b.metricWeightProm) return 1;
            if (b.metricWeightProm > a.metricWeightProm) return -1;
            return 0;
          }))
        : (state.allBreeds = state.allBreeds.sort((a, b) => {
            if (a.metricWeightProm > b.metricWeightProm) return -1;
            if (b.metricWeightProm > a.metricWeightProm) return 1;
            return 0;
          }));
    },
  },
});

export default dogSlice.reducer;
export const {
  getAllDogs,
  getDogByName,
  getDogById,
  clearDogDetail,
  filterByTemperaments,
  orderByAlf,
  orderByWeight
} = dogSlice.actions;
