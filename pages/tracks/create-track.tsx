import { Button, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FileUpload from "../../components/FileUpload";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";

import styles from "../../styles/CreateTrack.module.scss";

const CreateTrack = () => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);
    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');

    const handleClickBack = () => {
        if (activeStep !== 0) {
            setActiveStep((prev) => prev - 1);
        }
    };
    const handleClickNext = () => {
        if (activeStep !== 2) {
            setActiveStep((prev) => prev + 1);
        } else {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('artist', artist.value);
            formData.append('text', text.value);
            formData.append('picture', picture);
            formData.append('audio', audio);
            axios.post('http://localhost:4000/tracks', formData)
                .then(res => router.push('/tracks'))
                .catch((error) => console.log(error))
        }
    };
    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 && (
                    <Grid container direction="column" className={styles.contentWrap}>
                        <TextField {...name} className={styles.input} label="Track name" />
                        <TextField {...artist} className={styles.input} label="Author name" />
                        <TextField
                            {...text}
                            className={styles.input}
                            label="Lyrics"
                            multiline
                            rows={3}
                        />
                    </Grid>
                )}
                {activeStep === 1 && (
                    <FileUpload setFile={setPicture} accept="image/*">
                        <Button>Upload Cover</Button>
                        <div>{picture?.name}</div>
                    </FileUpload>
                )}
                {activeStep === 2 && (
                    <FileUpload setFile={setAudio} accept="audio/*">
                        <Button>Upload Audio</Button>
                        <div>{audio?.name}</div>
                    </FileUpload>
                )}
            </StepWrapper>
            <Grid container justifyContent="space-between">
                <Button disabled={activeStep === 0} onClick={handleClickBack}>
                    Back
                </Button>
                <Button onClick={handleClickNext}>
                    Next
                </Button>
            </Grid>
        </MainLayout>
    );
};

export default CreateTrack;
