"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import fuzzysort from "fuzzysort";
import dayjs from "dayjs";
import Category, { ALL_CATEGORIES } from "@/app/data/categories";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addIngredient, removeIngredient, updateIngredient } from "@/redux/slices/available_ingredients";
import ALL_INGREDIENTS, { AvailableIngredient, IngredientWithAvailability, addAvailabilityToIngredients } from "@/app/data/ingredients";
import Unit from "@/app/data/units";


const IngredientListItem = ({
    ingredient,
    onButtonClick,
}: {
    ingredient: IngredientWithAvailability;
    onButtonClick: (ingredient: IngredientWithAvailability) => void;
}) => {
    const handleButtonClick = useCallback(() => {
        onButtonClick(ingredient);
    }, [onButtonClick, ingredient]);

    return (
        <ListItem
            secondaryAction={
                <IconButton
                    onClick={handleButtonClick}
                >
                    <SvgIcon>
                        {
                            ingredient.quantity === undefined ?
                                (
                                    <AddIcon />
                                ) : (
                                    <CheckIcon />
                                )
                        }
                    </SvgIcon>
                </IconButton>
            }
        >
            <ListItemText>
                {ingredient.name}
            </ListItemText>
        </ListItem>
    );
};

const IngredientList = ({
    ingredients,
    onButtonClick,
}: {
    ingredients: IngredientWithAvailability[];
    onButtonClick: (ingredient: IngredientWithAvailability) => void;
}) => {
    return (
        <List>
            {
                ingredients.map((ingredient) => (
                    <IngredientListItem
                        key={ingredient.id}
                        ingredient={ingredient}
                        onButtonClick={onButtonClick}
                    />
                ))
            }
        </List>
    );
};

const NoIngredients = () => {
    return (
        <Stack>
            <Typography variant="h4" align="center" paddingTop={5}>
                Nothing to eat here yet...
            </Typography>
            <Typography variant="h6" align="center">
                Start adding ingredients from the categories above to
                generate recipes from our AI chef!
            </Typography>
        </Stack>
    );
};

const CategoryChip = ({
    category,
    isSelected,
    onSelected,
}: {
    category: Category | null;
    isSelected: boolean;
    onSelected: (category: Category | null) => void;
}) => {
    const onCategoryChipClick = useCallback(() => {
        onSelected(category);
    }, [onSelected, category]);

    return (
        <Chip
            label={category ?? "All"}
            onClick={onCategoryChipClick}
            variant={isSelected ?
                "outlined" :
                undefined}
        />
    );
};

const CategoryChipList = ({
    selectedCategory,
    setSelectedCategory,
}: {
    selectedCategory: Category | null;
    setSelectedCategory: (category: Category | null) => void;
}) => {
    const handleCategorySelected = useCallback((category: Category | null) => {
        setSelectedCategory(category);
    }, [setSelectedCategory]);

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{ paddingTop: 1, paddingBottom: 1, width: "100%", overflow: "auto", }}
        >
            <CategoryChip
                category={null}
                isSelected={selectedCategory === null}
                onSelected={handleCategorySelected}
            />
            {
                ALL_CATEGORIES.map((category) => (
                    <CategoryChip
                        key={category}
                        category={category}
                        isSelected={selectedCategory === category}
                        onSelected={handleCategorySelected}
                    />
                ))
            }
        </Stack>
    );
};


const filterIngredientsIfNeeded = (
    ingredients: IngredientWithAvailability[],
    category: Category | null,
    fuzzyResults: Fuzzysort.Results | null
): IngredientWithAvailability[] => {
    const shouldFilter = category !== null || fuzzyResults !== null;

    if (!shouldFilter) {
        return ingredients;
    }

    return ingredients.filter((ing) => {
        return (
            category === null ||
            ing.categories.includes(category)
        ) && (
                fuzzyResults == null ||
                fuzzyResults.find((res) => res.target === ing.name)
            );
    });
};

const IngredientDrawer = ({
    ingredient,
    onClose,
}: {
    ingredient: IngredientWithAvailability;
    onClose: () => void;
}) => {
    const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>();
    const [expirationDateTimestamp, setExpirationDateTimestamp] =
        useState<number | null>(null);
    const [expirationDateError, setExpirationDateError] =
        useState<string | null>(null);
    const [quantityAmountString, setQuantityAmountString] = useState("");

    const dispatch = useAppDispatch();

    const isQuantityAmountInvalidNumber = Number.isNaN(Number(quantityAmountString));

    const hasChanges = useCallback(
        (newIngredient: Pick<
            IngredientWithAvailability
        , "quantity"|"expirationDateTimestamp">) => {
            return ingredient.expirationDateTimestamp !== newIngredient
                    .expirationDateTimestamp
                || ingredient.quantity?.amount !== newIngredient
                    .quantity?.amount
                || ingredient.quantity?.unit !== newIngredient.quantity?.unit;
        },
        [
            ingredient,
        ]
    );

    useEffect(() => {
        setSelectedUnit(ingredient.quantity?.unit ??
            ingredient.unitOptions[0]);
        if (ingredient.quantity != null) {
            setQuantityAmountString("" + ingredient.quantity.amount);
        }
        if (ingredient.expirationDateTimestamp) {
            setExpirationDateTimestamp(ingredient.expirationDateTimestamp);
        }
    }, [
        setSelectedUnit,
        setExpirationDateTimestamp,
        setQuantityAmountString,
        ingredient,
    ]);

    const handleChangeUnit = useCallback((event: SelectChangeEvent<Unit>) => {
        const unit = event.target.value as Unit;
        setSelectedUnit(unit);
    }, [setSelectedUnit]);

    const handleExpirationDateChange = useCallback((value: dayjs.Dayjs | null) => {
        setExpirationDateTimestamp(value?.valueOf() ?? null);
    }, [setExpirationDateTimestamp]);

    const handleExpirationDateClear = useCallback(() => {
        setExpirationDateTimestamp(null);
    }, [setExpirationDateTimestamp]);

    const handleExpirationDateError = useCallback((error: DateValidationError) => {
        setExpirationDateError(error);
    }, [setExpirationDateError]);

    const handleQuantityAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setQuantityAmountString(event.target.value);
    }, [setQuantityAmountString]);

    const handleSubmitChanges = useCallback(() => {
        const newIngredient = {
            ingredientId: ingredient.id,
            quantity: {
                amount: Number(quantityAmountString),
                unit: selectedUnit,
            },
            expirationDateTimestamp: expirationDateTimestamp ?? undefined,
        };
        const changed = hasChanges(newIngredient);
        if (!changed) {
            onClose();
            return;
        }

        if (ingredient.quantity) {
            // Ingredient already added
            dispatch(updateIngredient(newIngredient));
        }
        else {
            // Ingredient not added
            dispatch(addIngredient(newIngredient));
        }
        onClose();
    }, [
        dispatch,
        onClose,
        ingredient,
        quantityAmountString,
        selectedUnit,
        expirationDateTimestamp,
    ]);

    const handleRemoveIngredient = useCallback(() => {
        dispatch(removeIngredient(ingredient.id));
        onClose();
    }, [
        dispatch,
        onClose,
        ingredient,
    ]);

    return (
        <Drawer
            anchor="bottom"
            open={true}
            onClose={onClose}
        >
            <Stack
                spacing={2}
                padding={2}
            >
                <Typography variant="h3" align="center">
                    {ingredient.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <TextField
                        type="number"
                        label="Quantity:"
                        value={quantityAmountString}
                        size="small"
                        error={isQuantityAmountInvalidNumber}
                        helperText={
                            isQuantityAmountInvalidNumber ?
                                "Must be a number" :
                                ""
                        }
                        onChange={handleQuantityAmountChange}
                        sx={{ flex: 1 }}
                    />
                    {
                        ingredient.unitOptions.length > 0 ?
                            (
                                <Select
                                    value={selectedUnit ?? ''}
                                    onChange={handleChangeUnit}
                                    sx={{ minWidth: 80 }}
                                >
                                    {
                                        ingredient.unitOptions.map(
                                            (unit) => (
                                                <MenuItem
                                                    key={unit}
                                                    value={unit}
                                                >
                                                    {unit}
                                                </MenuItem>
                                            )
                                        )
                                    }
                                </Select>
                            ) :
                            null
                    }
                </Stack>
                <DatePicker
                    label="Expiration date:"
                    value={expirationDateTimestamp ? dayjs(expirationDateTimestamp) : null}
                    onChange={handleExpirationDateChange}
                    onError={handleExpirationDateError}
                    slotProps={{
                        field: {
                            clearable: true,
                            onClear: handleExpirationDateClear,
                        },
                        textField: {
                            helperText: expirationDateError,
                        },
                    }}
                />
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <Button variant="outlined" onClick={handleRemoveIngredient}>
                        Remove
                    </Button>
                    <Button variant="contained" onClick={handleSubmitChanges}>
                        Done
                    </Button>
                </Stack>
            </Stack>
        </Drawer>
    );
};

export const Pantry = () => {
    const [selectedCategory, setSelectedCategory] = useState<
        Category | null
    >(null);
    const [searchString, setSearchString] = useState("");

    const currentIngredients = useAppSelector(
        (state) => state.availableIngredients.items
    );

    const ingredients = addAvailabilityToIngredients(currentIngredients);

    const filteredIngredients = useMemo(() => {
        const fuzzyResults = searchString ?
            fuzzysort.go(searchString, ingredients.map(({ name }) => name)) :
            null
        return filterIngredientsIfNeeded(
            ingredients,
            selectedCategory,
            fuzzyResults
        );
    }, [
        ingredients,
        searchString,
        selectedCategory,
    ]);
    const [selectedIngredient, setSelectedIngredient] = useState<
        IngredientWithAvailability|null
    >(null);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchString(newValue);
    }, [setSearchString]);

    const handleIngredientButtonClick = useCallback(
        (ingredient: IngredientWithAvailability) => {
            setSelectedIngredient(ingredient)
        },
        [
            setSelectedIngredient,
        ]
    );

    const handleIngredientDrawerClose = useCallback(() => {
        setSelectedIngredient(null);
    }, [setSelectedIngredient]);

    return (
        <Stack>
            <Input
                placeholder="Cheese, onion, lettuce, etc."
                value={searchString}
                onChange={handleSearchChange}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                sx={{ paddingTop: 1 }}
            />
            <CategoryChipList
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            {
                filteredIngredients.length === 0 ? (
                    <NoIngredients />
                ) : (
                    <IngredientList
                        ingredients={filteredIngredients}
                        onButtonClick={handleIngredientButtonClick}
                    />
                )
            }
            {
                selectedIngredient ? (
                    <IngredientDrawer
                        ingredient={selectedIngredient}
                        onClose={handleIngredientDrawerClose}
                    />
                ) : null
            }
        </Stack>
    )
};
