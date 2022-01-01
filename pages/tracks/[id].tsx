/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Button, Grid, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Track } from "../../types/track";
import styles from "../../styles/TrackPage.module.scss";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/useInput";


const TrackPage = ({ serverTrack }) => {
    const [track, setTrack] = useState<Track>(serverTrack);
    const router = useRouter();
    const username = useInput("");
    const text = useInput("");

    const addComment = async () => {
        try {
            const response = await axios.post("http://localhost:4000/tracks/comment", {
                username: username.value,
                text: text.value,
                trackId: track._id,
            });
            setTrack({...track, comments: [...track.comments, response.data] })
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickGoBack = () => {
        router.back();
    };
    return (
        <MainLayout title={"Music platform - " + track.name + " - " + track.artist}>
            <Button
                variant="outlined"
                className={styles.button}
                onClick={handleClickGoBack}
            >
                Go back
            </Button>
            <Grid container className={styles.contentWrap}>
                <img
                    src={"http://localhost:4000/" + track.picture}
                    width={200}
                    height={200}
                />
                <div className={styles.contentInfoWrap}>
                    <h1>Track name - {track.name}</h1>
                    <h1>Artist - {track.artist}</h1>
                    <h1>Listens - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Lyrics</h1>
            <p>{track.text}</p>
            <Grid container>
                <h1>Comments</h1>
                <TextField {...username} label="Your name" fullWidth />
                <TextField {...text} label="Comment" fullWidth multiline rows={4} />
                <Button onClick={addComment}>Send</Button>
            </Grid>
            <div>
                {track.comments?.map((comment) => (
                    <div key={comment._id}>
                        <div className={styles.comment}>
                            <div>Author - {comment.username}</div>
                            <div>Comment - {comment.text}</div>
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get("http://localhost:4000/tracks/" + params.id);
    return {
        props: {
            serverTrack: response.data,
        },
    };
};
