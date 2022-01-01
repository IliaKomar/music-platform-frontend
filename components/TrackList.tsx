import { Box, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Track } from "../types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
    tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {tracks.map((track) => (
                    <TrackItem key={track._id} track={track} />
                ))}
            </Box>
        </Grid>
    );
};

export default TrackList;
