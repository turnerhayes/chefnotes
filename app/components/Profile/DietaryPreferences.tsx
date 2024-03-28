"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCallback, useState } from "react";
import DietaryRestriction, { ALL_DIETARY_RESTRICTIONS } from "@/app/data/dietary_restrictions";
import { addAllergen, addDietaryRestriction, removeAllergen, removeDietaryRestriction } from "@/redux/slices/profile";
import Allergen, { ALL_ALLERGENS } from "@/app/data/allergens";
import { AddItemDrawer } from "./AddItemDrawer";
import { ItemList } from "./ItemList";
import { getUserAllergensSelector, getUserDietaryRestrictionsSelector } from "@/redux/selectors";


const Diet = ({
    diets,
}: {
    diets: DietaryRestriction[];
}) => {
    const dispatch = useAppDispatch();

    const handleDelete = useCallback((item: DietaryRestriction) => {
        dispatch(removeDietaryRestriction(item));
    }, [
        dispatch,
    ]);

    if (diets.length === 0) {
        return (
            <Typography
                variant="h5"
                align="center"
                paddingTop={3}
            >
                None recorded
            </Typography>
        );
    }

    return (
        <ItemList
            items={diets}
            onDelete={handleDelete}
        />
    );
};


const Allergens = ({
    allergens,
}: {
    allergens: Allergen[];
}) => {
    const dispatch = useAppDispatch();

    const handleDelete = useCallback((item: Allergen) => {
        dispatch(removeAllergen(item));
    }, [
        dispatch,
    ]);

    if (allergens.length === 0) {
        return (
            <Typography
                variant="h5"
                align="center"
                paddingTop={3}
            >
                None recorded
            </Typography>
        );
    }

    return (
        <ItemList
            items={allergens}
            onDelete={handleDelete}
        />
    );
};

const Header = ({
    children,
    showAddButton,
    onAddClick,
}: {
    children: string;
    showAddButton: boolean;
    onAddClick: () => void;
}) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            padding={1}
            component="header"
        >
            <Typography
                variant="h4"
            >
                {children}
            </Typography>
            {
                showAddButton ? (
                    <IconButton
                        onClick={onAddClick}
                    >
                        <AddIcon
                            fontSize="large"
                        />
                    </IconButton>
                ) : null
            }
        </Stack>
    );
};

const AddDietDrawer = ({
    isOpen,
    currentDiets,
    onClose,
}: {
    isOpen: boolean;
    currentDiets: DietaryRestriction[];
    onClose: () => void;
}) => {
    const dispatch = useAppDispatch();

    const handleAdd = useCallback((selectedRestriction: DietaryRestriction) => {
        dispatch(addDietaryRestriction(selectedRestriction));
    }, [
        dispatch,
    ]);

    return (
        <AddItemDrawer
            selectLabel="Restriction:"
            currentItems={currentDiets}
            allItems={ALL_DIETARY_RESTRICTIONS}
            isOpen={isOpen}
            onClose={onClose}
            onAdd={handleAdd}
        />
    );
};

const AddAllergenDrawer = ({
    isOpen,
    currentAllergens,
    onClose,
}: {
    isOpen: boolean;
    currentAllergens: Allergen[];
    onClose: () => void;
}) => {
    const dispatch = useAppDispatch();

    const handleAdd = useCallback((selectedAllergen: Allergen) => {
        dispatch(addAllergen(selectedAllergen));
    }, [
        dispatch,
    ]);

    return (
        <AddItemDrawer
            selectLabel="Allergen:"
            currentItems={currentAllergens}
            allItems={ALL_ALLERGENS}
            isOpen={isOpen}
            onClose={onClose}
            onAdd={handleAdd}
        />
    );
};

export const DietaryPreferences = () => {
    const diets = useAppSelector(getUserDietaryRestrictionsSelector);
    const allergens = useAppSelector(getUserAllergensSelector);

    const [
        isAddDietDrawerOpen,
        setIsAddDietDrawerOpen
    ] = useState(false);
    const [
        isAddAllergyDrawerOpen,
        setIsAddAllergyDrawerOpen
    ] = useState(false);

    const openAllergyDrawer = useCallback(() => {
        setIsAddAllergyDrawerOpen(true);
        setIsAddDietDrawerOpen(false);
    }, [
        setIsAddAllergyDrawerOpen,
        setIsAddDietDrawerOpen,
    ]);

    const openDietDrawer = useCallback(() => {
        setIsAddAllergyDrawerOpen(false);
        setIsAddDietDrawerOpen(true);
    }, [
        setIsAddAllergyDrawerOpen,
        setIsAddDietDrawerOpen,
    ]);

    const handleAddAllergyClick = useCallback(() => {
        openAllergyDrawer();
    }, [
        openAllergyDrawer,
    ]);

    const handleAddDietClick = useCallback(() => {
        openDietDrawer();
    }, [
        openDietDrawer,
    ]);

    const handleDietDrawerClose = useCallback(() => {
        setIsAddDietDrawerOpen(false);
    }, [
        setIsAddDietDrawerOpen,
    ]);

    const handleAllergyDrawerClose = useCallback(() => {
        setIsAddAllergyDrawerOpen(false);
    }, [
        setIsAddAllergyDrawerOpen,
    ]);

    return (
        <Stack
            paddingTop={3}
            height="100%"
        >
            <Stack>
                <Header
                    onAddClick={handleAddDietClick}
                    showAddButton={
                        diets.length < ALL_DIETARY_RESTRICTIONS.length
                    }
                >
                    Dietary Restrictions
                </Header>
                <Diet
                    diets={diets}
                />
            </Stack>
            <Stack
                paddingTop={6}
            >
                <Header
                    onAddClick={handleAddAllergyClick}
                    showAddButton={allergens.length < ALL_ALLERGENS.length}
                >
                    Allergens
                </Header>
                <Allergens
                    allergens={allergens}
                />
            </Stack>
            <AddDietDrawer
                isOpen={isAddDietDrawerOpen}
                onClose={handleDietDrawerClose}
                currentDiets={diets}
            />
            <AddAllergenDrawer
                isOpen={isAddAllergyDrawerOpen}
                onClose={handleAllergyDrawerClose}
                currentAllergens={allergens}
            />
        </Stack>
    );
};
