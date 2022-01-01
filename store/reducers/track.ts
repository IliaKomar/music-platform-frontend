import { TrackState, TrackAction, TrackActionTypes } from "../../types/track";

const initialState: TrackState = {
    tracks: [],
    error: "",
};

export const track = (
    state = initialState,
    action: TrackAction
): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return { ...state, error: action.payload };
        case TrackActionTypes.FETCH_TRACKS:
            return { ...state, tracks: action.payload };
        default:
            return state;
    };
};
