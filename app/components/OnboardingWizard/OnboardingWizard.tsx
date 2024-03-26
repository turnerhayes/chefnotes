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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAllergens, setAvailableTools, setDietaryRestrictions, setNumDiners } from "@/redux/slices/profile";
import Allergen from "@/app/data/allergens";
import DietaryRestriction from "@/app/data/dietary_restrictions";
import KitchenTool from "@/app/data/kitchen_tools";



export const OnboardingWizard = ({
  userDisplayName,
}: {
  userDisplayName?: string;
}) => {
  const [step, setStep] = useState(Step.INTRO);

  useEffect(() => {
    if (step > Step.SIGNIN && !userDisplayName) {
      setStep(Step.SIGNIN);
    }
    if (step <= Step.SIGNIN && userDisplayName) {
      setStep(Step.SIGNIN + 1);
    }
  }, [setStep, step, userDisplayName]);

  const dispatch = useAppDispatch();

  const allergens = useAppSelector((state) => state.profile.allergens);
  const restrictions = useAppSelector((state) => state.profile.dietaryRestrictions);
  const tools = useAppSelector((state) => state.profile.kitchenTools);
  const numDiners = useAppSelector((state) => state.profile.numDiners);

  const handleUpdateAllergens = useCallback((allergens: Allergen[]) => {
    dispatch(setAllergens(allergens));
  }, [dispatch]);

  const handleUpdateDietaryRestrictions = useCallback((restrictions: DietaryRestriction[]) => {
    dispatch(setDietaryRestrictions(restrictions));
  }, [dispatch]);

  const handleSetTools = useCallback((tools: KitchenTool[]) => {
    dispatch(setAvailableTools(tools));
  }, [dispatch]);

  const handleUpdateNumDiners = useCallback((numDiners: number|null) => {
    dispatch(setNumDiners(numDiners));
  }, [dispatch]);

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
        updateNumDiners={handleUpdateNumDiners}
      />)}
      {step === Step.DIET && (<DietaryRestrictionsStep
        onStepBack={handleBackClick}
        onStepForward={handleForwardClick}
        restrictions={restrictions}
        updateRestrictions={handleUpdateDietaryRestrictions}
      />)}
      {step === Step.ALLERGIES && (<AllergiesStep
        onStepBack={handleBackClick}
        onStepForward={handleForwardClick}
        selectedAllergies={allergens}
        updateSelectedAllergies={handleUpdateAllergens}
      />)}
      {step === Step.TOOLS && (<ToolsStep
        selectedTools={tools}
        updateSelectedTools={handleSetTools}
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
