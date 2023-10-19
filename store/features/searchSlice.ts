import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    search: string;
}

const initialState: SearchState = {
    search: "",
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
})

export const { setSearch } = searchSlice.actions

export const selectSearch = (state: RootState) => state.search

export default searchSlice.reducer