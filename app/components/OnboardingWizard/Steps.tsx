
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";
import { AppIcon } from "@/app/components/AppIcon";
import { OnboardingStep } from "./OnboardingStep";
import { setOnboardingComplete } from "@/app/onboarding";
import { useRouter } from "next/navigation";
import { SelectableList } from "./SelectableList";
import DietaryRestriction, { ALL_DIETARY_RESTRICTIONS } from "@/app/data/dietary_restrictions";
import Allergen, { ALL_ALLERGENS } from "@/app/data/allergens";
import KitchenTool, { ALL_KITCHEN_TOOLS } from "@/app/data/kitchen_tools";


export const NUM_STEPS = 10;

export const STEPS_WITHOUT_DOTS = 3;

export enum Step {
  INTRO = 0,
  SIGNIN = 1,
  WELCOME = 2,
  APP_PURPOSE = 3,
  PREFERENCES_INTRO = 4,
  NUM_DINERS = 5,
  DIET = 6,
  ALLERGIES = 7,
  TOOLS = 8,
  CONCLUSION = 9,
};



export const IntroStep = ({
  onContinue,
}: {
  onContinue: () => void;
}) => {
  useEffect(() => {
    const handler = () => {
      onContinue();
    };

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [onContinue]);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
    >
      <AppIcon
        width={350}
        height={350}
      />

      <Container sx={{ padding: 2, }}>
        <Typography variant="h5" align="center">
          Click anywhere to begin
        </Typography>
      </Container>
    </Stack>
  );
};

export const WelcomeStep = ({
  userDisplayName,
  onContinue,
}: {
  userDisplayName: string;
  onContinue: () => void;
}) => {

  const handleClick = useCallback(() => {
    onContinue();
  }, [onContinue]);

  return (
    <OnboardingStep>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          align="center"
          variant="h4"
          sx={{ paddingTop: 3, paddingBottom: 3 }}
        >
          Welcome, {userDisplayName}
        </Typography>
        <Typography
          align="center"
        >
          Let&apos;s make the most of what&apos;s in your kitchen. Ready to cook?
        </Typography>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{ width: 200, marginTop: 10 }}
        >
          Get started
        </Button>
      </Stack>
    </OnboardingStep>
  );
};

const fieldChangeHandler = (
  setter: Dispatch<SetStateAction<string>>,
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    setter(
      (event.target as HTMLInputElement).value
    );
  }
};

export const SigninStep = ({
  userDisplayName,
  onContinue,
}: {
  userDisplayName?: string;
  onContinue: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const isPasswordMismatch = Boolean(password) &&
    password !== passwordConfirm;

  useEffect(() => {
    if (userDisplayName) {
      onContinue();
      return;
    }
  }, [onContinue, userDisplayName]);

  const handleGoogleClick = useCallback(async () => {
    await signIn("google");
    onContinue();
  }, [onContinue]);

  const handleCreateAccountSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      signIn("credentials", {
        name,
        email,
        password
      });
    }, [
    name,
    email,
    password,
  ]
  );

  const handleNameChange = useCallback(
    fieldChangeHandler(setName),
    [setName]
  );

  const handleEmailChange = useCallback(
    fieldChangeHandler(setEmail),
    [setEmail]
  );

  const handlePasswordChange = useCallback(
    fieldChangeHandler(setPassword),
    [setPassword]
  );

  const handlePasswordConfirmChange = useCallback(
    fieldChangeHandler(setPasswordConfirm),
    [setPasswordConfirm]
  );

  return (
    <OnboardingStep>
      <Stack>
        <Typography variant="h4" align="center">
          Welcome to Chefnotes!
        </Typography>

        <Container
          component="form"
          onSubmit={handleCreateAccountSubmit}
          sx={{
            paddingTop: 2,
          }}
        >
          <Stack spacing={1}>
            <TextField
              label="Name:"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
              fullWidth
            />
            <TextField
              label="Email:"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
            />
            <TextField
              label="Password:"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              fullWidth
            />
            <TextField
              label="Confirm Password:"
              name="password_confirm"
              type="password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              error={isPasswordMismatch}
              helperText={
                isPasswordMismatch ? (
                  "Passwords do not match"
                ) : " "
              }
              fullWidth
            />
            <Stack
              direction="row"
              justifyContent="center"
              paddingBottom={2}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={!(
                  Boolean(name) &&
                  Boolean(email) &&
                  Boolean(password) &&
                  !isPasswordMismatch
                )}
              >
                Create Account
              </Button>
              {/* TODO: add Forgot Password functionality */}
            </Stack>
          </Stack>
        </Container>

        <IconButton onClick={handleGoogleClick}>
          <GoogleIcon fontSize="large" />
        </IconButton>
      </Stack>
    </OnboardingStep>
  );
};

export const AppPurposeStep = ({
  onStepBack,
  onStepForward,
}: {
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  return (
    <OnboardingStep
      totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
      step={Step.APP_PURPOSE - STEPS_WITHOUT_DOTS}
      onStepBack={onStepBack}
      onStepForward={onStepForward}
    >
      <Typography align="center">
        Chefnotes helps you cook with the leftovers and ingredients in your
        kitchen, preventing food waste and creating delicious and easy recipes.
      </Typography>
    </OnboardingStep>
  );
};

export const PreferencesIntroStep = ({
  onStepBack,
  onStepForward,
}: {
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  return (
    <OnboardingStep
      totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
      step={Step.PREFERENCES_INTRO - STEPS_WITHOUT_DOTS}
      onStepBack={onStepBack}
      onStepForward={onStepForward}
    >
      <Typography align="center">
        Tell us about your dietary preferences, any allergies, the kitchen
        equipment you have and how many people you&apos;re cooking for. Our AI
        Chef will take care of the rest!
      </Typography>
    </OnboardingStep>
  );
};

export const NumDinersStep = ({
  numDiners,
  updateNumDiners,
  onStepBack,
  onStepForward,
}: {
  numDiners: number | null;
  updateNumDiners: (numDiners: number | null) => void;
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  const MAX_DINER_COUNT = 6;

  const handleChange = useCallback((
    event: React.MouseEvent<HTMLElement>,
    numDiners: number | null
  ) => {
    updateNumDiners(numDiners);
  }, [updateNumDiners]);

  return (
    <OnboardingStep
      totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
      step={Step.NUM_DINERS - STEPS_WITHOUT_DOTS}
      onStepBack={onStepBack}
      onStepForward={onStepForward}
    >
      <Stack
        direction="column"
        alignItems="center"
      >
        <Typography align="center">
          How many people are you cooking for?
        </Typography>

        <ToggleButtonGroup
          value={numDiners}
          onChange={handleChange}
          exclusive
        >
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns="repeat(3, 1fr)"
            paddingTop={3}
          >
            {[...Array(MAX_DINER_COUNT + 1).keys()].slice(1).map((num) => (
              <Box key={num}>
                <ToggleButton value={num}>
                  {num}
                </ToggleButton>
              </Box>
            ))}
          </Box>
        </ToggleButtonGroup>
      </Stack>
    </OnboardingStep>
  );
};


export const DietaryRestrictionsStep = ({
  restrictions,
  updateRestrictions,
  onStepBack,
  onStepForward,
}: {
  restrictions: DietaryRestriction[];
  updateRestrictions: (newRestrictions: DietaryRestriction[]) => void;
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  const handleChange = useCallback((
    event: React.MouseEvent<HTMLElement>,
    newRestrictions: DietaryRestriction[]
  ) => {
    updateRestrictions(newRestrictions);
  }, [updateRestrictions]);

  return (
    <OnboardingStep
      totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
      step={Step.DIET - STEPS_WITHOUT_DOTS}
      onStepBack={onStepBack}
      onStepForward={onStepForward}
    >
      <Typography align="center">
        Do you have any dietary restrictions?
      </Typography>

      <ToggleButtonGroup
        value={restrictions}
        onChange={handleChange}
      >
        <Grid container>
          {
            ALL_DIETARY_RESTRICTIONS.map((restriction) => (
              <Grid item key={restriction} xs={6}>
                <ToggleButton value={restriction} fullWidth>
                  {restriction}
                </ToggleButton>
              </Grid>
            ))
          }
        </Grid>
      </ToggleButtonGroup>
    </OnboardingStep>
  );
};

export const AllergiesStep = ({
  selectedAllergies,
  updateSelectedAllergies,
  onStepBack,
  onStepForward,
}: {
  selectedAllergies: Allergen[];
  updateSelectedAllergies: (allergies: Allergen[]) => void;
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  return (
    <OnboardingStep
      totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
      step={Step.ALLERGIES - STEPS_WITHOUT_DOTS}
      onStepBack={onStepBack}
      onStepForward={onStepForward}
    >
      <Stack>
        <Typography align="center">
          Do you have any allergies?
        </Typography>

        <SelectableList
          items={ALL_ALLERGENS}
          selectedItems={selectedAllergies}
          updateSelectedItems={updateSelectedAllergies}
        />
      </Stack>
    </OnboardingStep>
  );
};

export const ToolsStep = ({
  selectedTools,
  updateSelectedTools,
  onStepBack,
  onStepForward,
}: {
  selectedTools: KitchenTool[];
  updateSelectedTools: (tools: KitchenTool[]) => void;
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  return (
    <OnboardingStep
      totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
      step={Step.TOOLS - STEPS_WITHOUT_DOTS}
      onStepBack={onStepBack}
      onStepForward={onStepForward}
    >
      <Typography align="center">
        What kitchen utensils and equipment do you have in your kitchen?
      </Typography>

      <SelectableList
        items={ALL_KITCHEN_TOOLS}
        searchPlaceholder="Microwave, stove, etc."
        selectedItems={selectedTools}
        updateSelectedItems={updateSelectedTools}
      />
    </OnboardingStep>
  );
};

export const ConclusionStep = ({
  onStepBack,
  onStepForward,
}: {
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    setOnboardingComplete();
    router.push("/pantry");
  }, [router]);

  return (
    <OnboardingStep
      totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
      step={Step.CONCLUSION - STEPS_WITHOUT_DOTS}
      onStepBack={onStepBack}
      onStepForward={onStepForward}
    >
      <Stack>
        <Typography align="center" paddingTop={2} paddingBottom={2}>
          We&apos;ve recorded all of your answers in order to give you the best
          customizable recipes, tailored just for you! You can always reset
          your preferences in your &quot;Profile&quot;.
        </Typography>

        <Button variant="contained" onClick={handleClick}>
          Start cookin&apos;
        </Button>
      </Stack>
    </OnboardingStep>
  );
};
