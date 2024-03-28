"use client";

import { ChangeEvent, Fragment, useCallback, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import fuzzysort from "fuzzysort";
import { Recipe } from "@/redux/slices/recipes";
import { getAvailableIngredientsSelector, getSavedRecipesSelector } from "@/redux/selectors";
import { useAppSelector } from "@/redux/hooks";
import { AvailableIngredient, IngredientId, IngredientWithAvailability, QuantifiedIngredient, addAvailabilityToIngredients } from "@/app/data/ingredients";
import Category from "@/app/data/categories";
import { Checkbox } from "@mui/material";

const combineIngredients = (
    ingredient1: QuantifiedIngredient,
    ingredient2: QuantifiedIngredient|null
): QuantifiedIngredient => {
    if (ingredient2 == null) {
        return ingredient1;
    }

    const quantity1 = ingredient1.quantity;
    const quantity2 = ingredient2.quantity;

    if (quantity1.unit !== quantity2.unit) {
        throw new Error(
            `Can't combine ingredients with different units (${
                quantity1.unit
            } vs ${quantity2.unit})`
        );
    }

    return {
        ...ingredient1,
        quantity: {
            amount: quantity1.amount + quantity2.amount,
            unit: quantity1.unit,
        },
    };
};

const getRecipeIngredients = (recipes: Recipe[]): IngredientWithAvailability[] => {
    return addAvailabilityToIngredients(Object.values(
        recipes.map((recipe) => recipe.ingredients).flat().reduce(
            (ingredients, ingredient) => {
                ingredients[ingredient.ingredientId] = combineIngredients(
                    ingredient, ingredients[ingredient.ingredientId]
                );

                return ingredients;
            },
            {} as {[ingredientId: string]: QuantifiedIngredient}
        )
    ), true);
};

type AvailableIngredientsByIdMap = Partial<{
    [id in IngredientId]: AvailableIngredient;
}>

const filterAndReduceIngredients = (
    ingredients: IngredientWithAvailability[],
    availableIngredients: AvailableIngredient[],
    searchResults: IngredientWithAvailability[]|null
) => {
    ingredients = searchResults ?? ingredients;
    const availableIngredientsById: AvailableIngredientsByIdMap =
        availableIngredients.reduce(
            (availableMap, ingredient) => ({
                ...availableMap,
                [ingredient.ingredientId]: ingredient,
            }),
            {} as AvailableIngredientsByIdMap
        );

    return ingredients.reduce((ingredients, ingredient) => {
        const availableQuantity = availableIngredientsById[ingredient.id]?.
            quantity;
        if (availableQuantity) {
            if (availableQuantity.unit !== ingredient.quantity.unit) {
                throw new Error(`Cannot reduce amount in unit ${
                    ingredient.quantity.unit
                } by unit ${availableQuantity.unit}`);
            }
            const amount = ingredient.quantity.amount - availableQuantity.
                amount;
            if (amount > 0) {
                ingredients.push({
                    ...ingredient,
                    quantity: {
                        ...ingredient.quantity,
                        amount,
                    }
                });
            }
        }
        else {
            ingredients.push(ingredient);
        }

        return ingredients;
    }, [] as IngredientWithAvailability[]);
};

type GroupedIngredients = Record<Category, IngredientWithAvailability[]>;

const groupIngredientsByCategory = (
    ingredients: IngredientWithAvailability[]
): GroupedIngredients => {
    const grouped: GroupedIngredients = ingredients.reduce((grouped, ingredient) => {
        const categories = ingredient.categories;
        for (const category of categories) {
            grouped[category] = [
                ...(grouped[category] || []),
                ingredient,
            ];
        }
        return grouped;
    }, {} as GroupedIngredients);

    return grouped;
};

const IngredientListItem = ({
    ingredient,
}: {
    ingredient: IngredientWithAvailability;
}) => (
    <ListItem
        secondaryAction={
            <Checkbox
                value={ingredient.id}
            />
        }
    >
        <ListItemText
            secondary={`${
                ingredient.quantity.amount
            }${
                ingredient.quantity.unit ?? ""
            }`}
        >
            {ingredient.name}
        </ListItemText>
    </ListItem>
);

const IngredientList = ({
    ingredientGroups,
}: {
    ingredientGroups: GroupedIngredients;
}) => {
    return (
        <List>
            {
                (Object.keys(ingredientGroups) as Category[]).map(
                    (category: Category) => (
                        <Fragment key={category}>
                            <ListSubheader>
                                {category}
                            </ListSubheader>
                            {
                                ingredientGroups[category].map(
                                    (ingredient) => (
                                        <IngredientListItem
                                            key={ingredient.id}
                                            ingredient={ingredient}
                                        />
                                    )
                                )
                            }
                        </Fragment>
                    )
                )
            }
        </List>
    );
}

export const GroceryList = () => {
    const savedRecipes: Recipe[] = useAppSelector(getSavedRecipesSelector);
    const availableIngredients: AvailableIngredient[] = useAppSelector(
        getAvailableIngredientsSelector
    );
    const [searchString, setSearchString] = useState("");
    const [searchResults, setSearchResults] =
        useState<IngredientWithAvailability[]|null>(null);

    const ingredients = useMemo(
        () => getRecipeIngredients(savedRecipes),
        [
            savedRecipes,
        ]
    );

    const filteredIngredientGroups = useMemo(() => {
        const filtered = filterAndReduceIngredients(
            ingredients,
            availableIngredients,
            searchResults
        );


        return groupIngredientsByCategory(filtered);
    }, [
        searchResults,
        ingredients,
    ]);

    const handleSearchChanged = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const searchString = event.target.value;
        setSearchString(searchString);
        if (searchString.length === 0) {
            setSearchResults(null);
            return;
        }
        const results = fuzzysort.go(searchString, ingredients, {
            key: "name",
        }).map(
            (result) => result.obj
        );
        setSearchResults(results);
    }, [
        setSearchResults,
        setSearchString,
        ingredients,
    ]);

    return (
        <Stack>
            <Typography variant="h4" align="center">
                Shopping Cart
            </Typography>

            <Container sx={{ paddingTop: 2 }}>
                <Input
                    fullWidth
                    value={searchString}
                    onChange={handleSearchChanged}
                    placeholder="Search all items"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            </Container>
            {
                Object.values(filteredIngredientGroups).length === 0 ?
                    (
                        <Typography
                            variant="h4"
                            align="center"
                            paddingTop={3}
                        >
                            No ingredients from any recipes needed
                        </Typography>
                    ) : (
                        <IngredientList
                            ingredientGroups={filteredIngredientGroups}
                        />
                    )
            }
        </Stack>
    );
};
