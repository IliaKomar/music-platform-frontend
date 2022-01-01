import React, { useEffect } from "react";
import { IconButton, Grid } from "@material-ui/core";
import { Pause, PlayArrow, VolumeUp } from "@material-ui/icons";
import { Track } from "../../types/track";
import styles from "./index.module.scss";
import TrackProgress from "../TrackProgress";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

let audio;

const Player = () => {
    const { pause, volume, duration, active, currentTime } = useTypedSelector(
        (state) => state.player
    );
    const {
        pauseTrack,
        playTrack,
        setVolume,
        setCurrentTime,
        setDuration,
        setActiveTrack,
    } = useActions();

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        } else {
            setAudio();
            handleClickPlay();
        }
    }, [active]);

    const setAudio = () => {
        if (active) {
            audio.src = "http://localhost:4000/" + active.audio;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration));
            };
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime));
            };
        }
    };
    const handleClickPlay = () => {
        if (pause) {
            playTrack();
            audio.play();
        } else {
            pauseTrack();
            audio.pause();
        }
    };
    const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
    };
    const handleChangeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    };

    if (!active) {
        return null;
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={handleClickPlay}>
                {pause ? <PlayArrow /> : <Pause />}
            </IconButton>
            <Grid container direction="column" className={styles.contentWrap}>
                <div>{active?.name}</div>
                <div className={styles.artist}>{active?.artist}</div>
            </Grid>
            <TrackProgress
                left={currentTime}
                right={duration}
                onChange={handleChangeCurrentTime}
            />
            <VolumeUp className={styles.volumeIcon} />
            <TrackProgress left={volume} right={100} onChange={handleChangeVolume} />
        </div>
    );
};

export default Player;
