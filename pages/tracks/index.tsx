import React, { useState } from "react";

import { Grid, Card, Button, Box, TextField } from "@material-ui/core";

import { useRouter } from "next/router";

import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/actions/track";
import { useDispatch } from "react-redux";

const Tracks = () => {
    const router = useRouter();
    const [query, setQuery] = useState<string>("");
    const { tracks, error } = useTypedSelector((state) => state.track);
    const dispatch = useDispatch() as NextThunkDispatch;
    const [timer, setTimer] = useState(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(
            setTimeout(async() => {
                await dispatch(searchTracks(query));
            }, 500)
        );
    };

    if (error) {
        return (
            <MainLayout>
                <h1>{error}</h1>
            </MainLayout>
        );
    }

    return (
        <MainLayout title="Track list - music platform">
            <Grid container justifyContent="center">
                <Card style={{ width: "900px" }}>
                    <Box p={3}>
                        <Grid container justifyContent="space-between">
                            <h1>Track List</h1>
                            <Button onClick={() => router.push("/tracks/create-track")}>
                                Upload own track
                            </Button>
                        </Grid>
                    </Box>
                    <TextField fullWidth value={query} onChange={handleSearch} />
                    <TrackList tracks={tracks} />
                    {tracks.length === 0 && 
                        <h1>Empty track list but you can upload own track!</h1>
                    }
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Tracks;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchTracks());

        return { props: {} };
    }
);
