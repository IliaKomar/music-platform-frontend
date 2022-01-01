import { Dispatch } from "react";
import { TrackAction, TrackActionTypes } from "../../types/track";
import axios from "axios";

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get("http://localhost:4000/tracks");
            dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
        } catch (error) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Error occurred while loading tracks",
            });
        }
    };
};
export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get("http://localhost:4000/tracks/search?query=" + query);
            dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
        } catch (error) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Error occurred while loading tracks",
            });
        }
    };
};
