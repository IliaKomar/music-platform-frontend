import React from "react";
import {
  Container,
  StepLabel,
  Stepper,
  Step,
  Grid,
  Card,
} from "@material-ui/core";
import styles from "./index.module.scss";

interface StepWrapperProps {
  activeStep: number;
}
const steps = ["Track Info", "Upload cover", "Upload audio"];
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center" className={styles.content}>
        <Card className={styles.card}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
