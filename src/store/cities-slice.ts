import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cityType } from "../types/city-types";

const initialState: { cities: cityType[]; error: string } = {
  cities: [],
  error: "",
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    updateCities: (state, action: PayloadAction<cityType[]>) => {
      state.cities = action.payload;
    },
    updateError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const fetchCityData = () => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const response = await fetch("");
      if (!response.ok) {
        throw new Error("Could not fetch cities");
      }
      const cityData = await response.json();
      return cityData;
    };
    try {
      const cityData = await fetchData();
      dispatch(citiesSlice.actions.updateCities(cityData));
    } catch (error) {
      dispatch(citiesSlice.actions.updateError("Could not fetch cities"));
    }
  };
};

export default citiesSlice;
export const { updateCities } = citiesSlice.actions;
