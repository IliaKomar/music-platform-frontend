import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { player } from "./player";
import { track } from './track';

const rootReducer = combineReducers({
    player,
    track
});

export const reducer = (state, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        if (state.count) nextState.count = state.count;
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export type RootState = ReturnType<typeof rootReducer>;
