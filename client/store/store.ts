import {
    Action,
    AnyAction,
    CombinedState,
    combineReducers,
    configureStore,
    Reducer,
    Store,
    ThunkAction,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import navigationReducer from "./navigationSlice";
import authReducer from "./authSlice";

const combinedReducer = combineReducers({
    navigation: navigationReducer,
    auth: authReducer,
});

const masterReducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
    if (action.type == HYDRATE) {
        const nextState = {
            ...state, // update incoming server side changes
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

// @ts-ignore
export const makeStore = () => configureStore({ reducer: masterReducer });

type IStore = ReturnType<typeof makeStore>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
