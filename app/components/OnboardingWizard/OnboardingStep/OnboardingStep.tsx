import { ReactNode } from "react";
import { AppIcon } from "@/app/components/AppIcon";
import styles from "./OnboardingStep.module.css";
import { Button, Container, MobileStepper, Stack } from "@mui/material";


type OnboardingStepProps = {
    children: ReactNode;
} & (
    {
        totalSteps?: never;
        step?: never;
        onStepBack?: never;
        onStepForward?: never;
    } | {
        totalSteps: number;
        step: number;
        onStepBack: () => void;
        onStepForward: () => void;
    }
);

export const OnboardingStep = ({
    children,
    totalSteps,
    step,
    onStepBack,
    onStepForward,
}: OnboardingStepProps) => {
    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="stretch"
            padding={3}
            height="100%"
        >
            <Container>
                <AppIcon />
            </Container>
            <Container sx={{flex: 1}}>
                {children}
            </Container>
            {
                step != null && (
                    <MobileStepper
                        sx={{marginTop: "auto"}}
                        position="static"
                        className={styles.stepperDots}
                        variant="dots"
                        steps={totalSteps}
                        activeStep={step}
                        backButton={
                            <Button
                                onClick={onStepBack}
                                disabled={step <= 0}
                            >
                                Back
                            </Button>
                        }
                        nextButton={
                            <Button
                                onClick={onStepForward}
                                disabled={step === totalSteps - 1}
                            >
                                Next
                            </Button>
                        }
                    />
                ) 
            }
        </Stack>
    )
};