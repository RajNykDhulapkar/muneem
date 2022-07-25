import { AnyAction, combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import navigationReducer, { navigationReducerState } from "./style/navigationSlice";

const combineReducer = combineReducers({
    navigation: navigationReducer,
});

export type RootState = ReturnType<typeof combineReducer>;

const masterReducer = (state: RootState, action: AnyAction) => {
    if (action.type == HYDRATE) {
        const nextState = {
            ...state,
            // update incoming server side changes
        };
        return combineReducer(state, action);
    } else {
        return combineReducer(state, action);
    }
};

export const makeStore = () => configureStore({ reducer: { ...masterReducer } });

export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });
