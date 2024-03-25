import Link from "next/link";
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { IngredientWithAvailability, addAvailabilityToIngredients } from "@/app/data/ingredients";
import { useAppSelector } from "@/redux/hooks";


const NoIngredients = () => {
    return (
        <Stack justifyContent="center">
            <Typography variant="h4" align="center">
                No ingredients added yet. Add some in your <Link
                    href="/pantry">
                        Pantry
                    </Link>.
            </Typography>
        </Stack>
    );
};

export const MyIngredientsList = () => {
    const ingredients = useAppSelector(
        (state) => state.availableIngredients.items
    );
    const ingredientsWithAvailability: IngredientWithAvailability[] =
        addAvailabilityToIngredients(ingredients.filter(
            (ing) => ing.quantity != undefined
        ), true);

    if (ingredients.length === 0) {
        return (
            <NoIngredients />
        );
    }

    return (
        <List>
            {
                ingredientsWithAvailability.map((ingredient) => (
                    <ListItem
                        key={ingredient.id}
                        secondaryAction={
                            `${ingredient.quantity?.amount}${
                                ingredient.quantity?.unit ?
                                    " " + ingredient.quantity?.unit
                                    : ""
                            }`
                        }
                    >
                        <ListItemText>
                            {ingredient.name}
                        </ListItemText>
                    </ListItem>
                ))
            }
        </List>
    );
};
