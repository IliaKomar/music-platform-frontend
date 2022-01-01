/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Card, IconButton, Grid } from "@material-ui/core";
import React from "react";
import { Track } from "../../types/track";
import styles from "./index.module.scss";
import { Delete, Pause, PlayArrow } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useActions } from "../../hooks/useActions";

interface TrackItemProps {
    track: Track;
    active?: boolean;
};

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter();
    const { playTrack,  setActiveTrack } = useActions();

    const handleClickTrack = () => {
        router.push("/tracks/" + track._id);
    };

    const handleClickPlay = (e) => {
        e.stopPropagation();
        setActiveTrack(track);
        playTrack();
    };

    return (
        <Card className={styles.track} onClick={handleClickTrack}>
            <IconButton onClick={handleClickPlay}>
                {!active ? <PlayArrow /> : <Pause />}
            </IconButton>
            <img width={70} height={70} src={"http://localhost:4000/" + track.picture} />
            <Grid container direction="column" className={styles.contentWrap}>
                <div>{track.name}</div>
                <div className={styles.artist}>{track.artist}</div>
            </Grid>
            {active && <div>03:10 / 03:22</div>}
            <IconButton
                className={styles.deleteIconWrap}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;
