import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type navigationReducerState = {
    sideBarNavlinkPreviousIndex: number;
    sideBarNavlinkCurrentIndex: number;
    dashboardTopNavPreviousIndex: number;
    dashboardTopNavCurrentIndex: number;
};

const initialState: navigationReducerState = {
    sideBarNavlinkPreviousIndex: 0,
    sideBarNavlinkCurrentIndex: 0,
    dashboardTopNavPreviousIndex: 0,
    dashboardTopNavCurrentIndex: 0,
};

export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        changeSideBarNavlinkIndex: (state, action: PayloadAction<number>) => {
            state.sideBarNavlinkPreviousIndex = state.sideBarNavlinkCurrentIndex;
            state.sideBarNavlinkCurrentIndex = action.payload;
        },
        changeDashboardTopNavIndex: (state, action: PayloadAction<number>) => {
            state.dashboardTopNavPreviousIndex = state.dashboardTopNavCurrentIndex;
            state.dashboardTopNavCurrentIndex = action.payload;
        },
    },
});

// export type navigationReducerState = ReturnType<typeof navigationSlice.reducer>;

export const { changeSideBarNavlinkIndex, changeDashboardTopNavIndex } = navigationSlice.actions;

export const selectSideBarNavlinkPreviousIndex = (state: RootState) =>
    state.navigation.sideBarNavlinkPreviousIndex;
export const selectSideBarNavlinkCurrentIndex = (state: RootState) =>
    state.navigation.sideBarNavlinkCurrentIndex;
export const selectDashboardTopNavPreviousIndex = (state: RootState) =>
    state.navigation.dashboardTopNavPreviousIndex;
export const selectDashboardTopNavCurrentIndex = (state: RootState) =>
    state.navigation.dashboardTopNavCurrentIndex;

export default navigationSlice.reducer;
