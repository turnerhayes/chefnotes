"use client";

import { useCallback, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import {
  AllergiesStep,
  AppPurposeStep,
  ConclusionStep,
  DietaryRestrictionsStep,
  IntroStep,
  NumDinersStep,
  PreferencesIntroStep,
  SigninStep,
  ToolsStep,
  WelcomeStep,
  NUM_STEPS,
  Step,
} from "./Steps";



export const OnboardingWizard = ({
  userDisplayName,
}: {
  userDisplayName?: string;
}) => {
  const [step, setStep] = useState(Step.INTRO);

  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [numDiners, setNumDiners] = useState<number|null>(null);
  const [tools, setTools] = useState<string[]>([]);

  useEffect(() => {
    if (step > Step.SIGNIN && !userDisplayName) {
      setStep(Step.SIGNIN);
    }
  }, [setStep, step, userDisplayName]);

  const handleBackClick = useCallback(() => {
    setStep(Math.max(step - 1, 0));
  }, [setStep, step]);

  const handleForwardClick = useCallback(() => {
    setStep(Math.min(step + 1, NUM_STEPS - 1));
  }, [setStep, step]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      {step === Step.INTRO && <IntroStep onContinue={handleForwardClick} />}
      {step === Step.SIGNIN && (<SigninStep
        userDisplayName={userDisplayName}
        onContinue={handleForwardClick}
      />)}
      {step === Step.WELCOME && (<WelcomeStep
        userDisplayName={userDisplayName!}
        onContinue={handleForwardClick}
      />)}
      {step === Step.APP_PURPOSE && (<AppPurposeStep
        onStepBack={handleBackClick}
        onStepForward={handleForwardClick}
      />)}
      {step === Step.PREFERENCES_INTRO && (<PreferencesIntroStep
        onStepBack={handleBackClick}
        onStepForward={handleForwardClick}
      />)}
      {step === Step.NUM_DINERS && (<NumDinersStep
        onStepBack={handleBackClick}
        onStepForward={handleForwardClick}
        numDiners={numDiners}
        updateNumDiners={setNumDiners}
      />)}
      {step === Step.DIET && (<DietaryRestrictionsStep
        onStepBack={handleBackClick}
        onStepForward={handleForwardClick}
        restrictions={restrictions}
        updateRestrictions={setRestrictions}
      />)}
      {step === Step.ALLERGIES && (<AllergiesStep
        onStepBack={handleBackClick}
        onStepForward={handleForwardClick}
        onContinue={handleForwardClick}
      />)}
      {step === Step.TOOLS && (<ToolsStep
        selectedTools={tools}
        updateSelectedTools={setTools}
        onStepBack={handleBackClick}
        onStepForward={handleForwardClick}
      />)}
      {step === Step.CONCLUSION && (<ConclusionStep
        onStepBack={handleBackClick}
        onStepForward={handleForwardClick}
      />)}
    </Stack>
  );
};
