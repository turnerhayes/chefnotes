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
            paddingTop={0}
            height="100%"
            overflow="hidden"
        >
            <Container sx={{paddingTop: 2, display: "flex", justifyContent: "center"}}>
                <AppIcon
                    className={styles.stepLogo}
                />
            </Container>
            <Container sx={{flex: 1, overflow: "auto", paddingTop: 4}}>
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
