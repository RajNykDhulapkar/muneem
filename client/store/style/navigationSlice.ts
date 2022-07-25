import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    sideBarNavlinkPreviousIndex: 0,
    sideBarNavlinkCurrentIndex: 0,
};

export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        changeSideBarNavlinkIndex: (state, action: PayloadAction<number>) => {
            state.sideBarNavlinkPreviousIndex = state.sideBarNavlinkCurrentIndex;
            state.sideBarNavlinkCurrentIndex = action.payload;
        },
    },
});

export type navigationReducerState = ReturnType<typeof navigationSlice.reducer>;

export const { changeSideBarNavlinkIndex } = navigationSlice.actions;

export const selectSideBarNavlinkCurrentIndex = (state: RootState) =>
    state.navigation.sideBarNavlinkCurrentIndex;

export default navigationSlice.reducer;
