import { Track } from "./track";

export interface PlayerState {
    active: null | Track;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}

export enum PlayerActionTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
}

interface PlayAction {
    type: PlayerActionTypes.PLAY;
}
interface PauseAction {
    type: PlayerActionTypes.PAUSE;
}
interface setActiveAction {
    type: PlayerActionTypes.SET_ACTIVE;
    payload: Track;
}
interface setDurationAction {
    type: PlayerActionTypes.SET_DURATION;
    payload: number;
}
interface setCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME;
    payload: number;
}
interface setVolumeAction {
    type: PlayerActionTypes.SET_VOLUME;
    payload: number;
}

export type PlayerAction =
    | PlayAction
    | PauseAction
    | setActiveAction
    | setDurationAction
    | setCurrentTimeAction
    | setVolumeAction;
