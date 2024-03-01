
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItemButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import { Google, Search as SearchIcon } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import fuzzysort from "fuzzysort";
import { AppIcon } from "@/app/components/AppIcon";
import { OnboardingStep } from "./OnboardingStep";
import { setOnboardingComplete } from "@/app/onboarding";
import { useRouter } from "next/navigation";


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
    <Stack>
        <AppIcon />

        <Container sx={{padding: 2, }}>
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
            sx={{paddingTop: 3, paddingBottom: 3}}
        >
          Welcome, {userDisplayName}
        </Typography>
        <Typography
            align="center"
        >
            Let's make the most of what&apos;s in your kitchen. Ready to cook?
        </Typography>
        <Button
            onClick={handleClick}
            variant="contained"
            sx={{width: 200, marginTop: 10}}
        >
          Get started
        </Button>
      </Stack>
    </OnboardingStep>
  );
};

export const SigninStep = ({
  userDisplayName,
  onContinue,
}: {
  userDisplayName?: string;
  onContinue: () => void;
}) => {
  useEffect(() => {
    if (userDisplayName) {
      onContinue();
    }
  }, [onContinue, userDisplayName]);

  const handleGoogleClick = useCallback(async () => {
    await signIn("google");
    onContinue();
  }, [onContinue]);

  return (
    <OnboardingStep>
      <Typography variant="h3">Welcome to Chefnotes!</Typography>

      <Container>
        <IconButton onClick={handleGoogleClick}>
          <Google />
        </IconButton>
      </Container>
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
  numDiners: number|null;
  updateNumDiners: (numDiners: number|null) => void;
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  const MAX_DINER_COUNT = 6;

  const handleChange = useCallback((
    event: React.MouseEvent<HTMLElement>,
    numDiners: number|null
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

const RESTRICTIONS = [
  "Vegan",
  "Vegetarian",
  "Pescetarian",
  "Dairy-Free",
  "Kosher",
  "Halal",
  "Keto",
  "Gluten-Free",
];

export const DietaryRestrictionsStep = ({
  restrictions,
  updateRestrictions,
  onStepBack,
  onStepForward,
}: {
  restrictions: string[];
  updateRestrictions: (newRestrictions: string[]) => void;
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  const handleChange = useCallback((
    event: React.MouseEvent<HTMLElement>,
    newRestrictions: string[]
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
                RESTRICTIONS.map((restriction) => (
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
  onContinue,
  onStepBack,
  onStepForward,
}: {
  onContinue: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  const handleNoClick = useCallback(() => {
    onContinue();
  }, [onContinue]);

  return (
    <OnboardingStep
      totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
      step={Step.ALLERGIES - STEPS_WITHOUT_DOTS}
      onStepBack={onStepBack}
      onStepForward={onStepForward}
    >
        <Typography align="center">
            Do you have any allergies?
        </Typography>

        <Stack>
            <Button variant="contained" onClick={handleNoClick}>
                No
            </Button>
        </Stack>
    </OnboardingStep>
  );
};


const ALL_TOOLS = [
  "Stove top",
  "Oven",
  "Skillet",
  "Pots",
  "Pans",
  "Microwave",
  "Blender",
  "Knives",
  "Mixing Bowls",
];

export const ToolListItem = ({
  tool,
  isSelected,
  onSelected,
  onUnselected,
}: {
  tool: string;
  isSelected: boolean;
  onSelected: (tool: string) => void;
  onUnselected: (tool: string) => void;
}) => {
  const handleClick = useCallback(() => {
    if (isSelected) {
      onUnselected(tool);
    }
    else {
      onSelected(tool);
    }
  }, [onSelected, tool, isSelected]);

  return (
    <ListItemButton
        selected={isSelected}
        onClick={handleClick}
    >
        {tool}
    </ListItemButton>
  );
};

export const ToolsStep = ({
  selectedTools,
  updateSelectedTools,
  onStepBack,
  onStepForward,
}: {
  selectedTools: string[];
  updateSelectedTools: (tools: string[]) => void;
  onStepBack: () => void;
  onStepForward: () => void;
}) => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState(ALL_TOOLS);

  const handleSearchChanged = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    setSearchString(searchString);
    if (searchString.length === 0) {
      setSearchResults(ALL_TOOLS);
      return;
    }
    const results = fuzzysort.go(searchString, ALL_TOOLS);
    setSearchResults(results.map(({target}) => target));
  }, [setSearchString, setSearchResults]);

  const handleToolSelected = useCallback((tool: string) => {
    const newResults = new Set(selectedTools);
    newResults.add(tool);
    updateSelectedTools(Array.from(newResults));
  }, [updateSelectedTools, selectedTools]);

  const handleToolUnselected = useCallback((tool: string) => {
    const newResults = new Set(selectedTools);
    newResults.delete(tool);
    updateSelectedTools(Array.from(newResults));
  }, [updateSelectedTools, selectedTools]);

  return (
    <OnboardingStep
        totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
        step={Step.TOOLS - STEPS_WITHOUT_DOTS}
        onStepBack={onStepBack}
        onStepForward={onStepForward}
    >
      <Typography>What kitchen utensils and equipment do you have in your kitchen?</Typography>

      <Stack>
        <Box sx={{paddingTop: 2}}>
            <Input
                fullWidth
                value={searchString}
                onChange={handleSearchChanged}
                placeholder="Microwave, stove, etc."
                startAdornment={
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                }
            />
        </Box>
        <List>
            {searchResults.map((tool) => (
                <ToolListItem
                    key={tool}
                    tool={tool}
                    isSelected={selectedTools.includes(tool)}
                    onSelected={handleToolSelected}
                    onUnselected={handleToolUnselected}
                />
            ))}
        </List>
      </Stack>
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
        router.push("/");
    }, [setOnboardingComplete]);

    return (
        <OnboardingStep
            totalSteps={NUM_STEPS - STEPS_WITHOUT_DOTS}
            step={Step.CONCLUSION - STEPS_WITHOUT_DOTS}
            onStepBack={onStepBack}
            onStepForward={onStepForward}
        >
            <Stack>
                <Typography align="center">
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
