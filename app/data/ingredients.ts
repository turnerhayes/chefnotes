import Category from "./categories";
import Unit from "./units";


export interface Ingredient {
    id: string;
    name: string;
    unitOptions: Unit[];
    categories: Category[];
}

export interface AvailableIngredient {
    ingredientId: string;
    quantity: Quantity;
    expirationDateTimestamp?: number;
}

export interface Quantity {
    amount: number;
    unit?: Unit;
}

export type IngredientWithAvailability = Ingredient & {
    quantity?: AvailableIngredient["quantity"];
    expirationDateTimestamp?: AvailableIngredient["expirationDateTimestamp"];
};

const ingredients: Ingredient[] = [
    {
        id: "salmon",
        name: "Salmon",
        unitOptions: [
            Unit.GRAMS,
            Unit.MILLIGRAMS,
            Unit.OUNCES,
        ],
        categories: [
            Category.FISH,
        ],
    },
    {
        id: "almonds",
        name: "Almonds",
        unitOptions: [
            Unit.GRAMS,
            Unit.MILLIGRAMS,
            Unit.OUNCES,
        ],
        categories: [
            Category.NUTS,
        ],
    },
    {
        id: "onions",
        name: "Onions",
        unitOptions: [
            Unit.GRAMS,
            Unit.MILLIGRAMS,
            Unit.OUNCES,
        ],
        categories: [
            Category.VEGGIES,
        ],
    },
    {
        id: "chicken_breast",
        name: "Chicken Breast",
        unitOptions: [
            Unit.GRAMS,
            Unit.MILLIGRAMS,
            Unit.OUNCES,
        ],
        categories: [
            Category.MEAT,
        ],
    },
    {
        id: "fettucine",
        name: "Fettucine",
        unitOptions: [
            Unit.POUNDS,
            Unit.OUNCES,
        ],
        categories: [
            Category.GRAINS,
        ],
    },
    {
        id: "ziti",
        name: "Ziti",
        unitOptions: [
            Unit.POUNDS,
            Unit.OUNCES,
        ],
        categories: [
            Category.GRAINS,
        ],
    },
    {
        id: "tomato_paste",
        name: "Tomato Paste",
        unitOptions: [
            Unit.GRAMS,
            Unit.MILLIGRAMS,
            Unit.POUNDS,
            Unit.OUNCES,
        ],
        categories: [
            Category.FRUITS,
        ],
    },
];


export default ingredients;


export const addAvailabilityToIngredients = (
    currentIngredients: AvailableIngredient[],
    excludeUnavailable: boolean = false
): IngredientWithAvailability[] => {
    const currentIngredientsById = currentIngredients.reduce(
        (idMap: Record<string, AvailableIngredient>, ingredient) => {
            idMap[ingredient.ingredientId] = ingredient;
            return idMap;
        },
        {}
    );

    let ingredientsToUse: Ingredient[];
    if (excludeUnavailable) {
        const ids = Object.keys(currentIngredientsById);
        ingredientsToUse = ingredients.filter((ing) => ids.includes(ing.id));
    }
    else {
        ingredientsToUse = ingredients;
    }

    return ingredientsToUse.map((ingredient): IngredientWithAvailability => {
        const ingredientWithAvailability: IngredientWithAvailability = {
            ...ingredient,
        };

        const curr = currentIngredientsById[ingredient.id];
        if (curr) {
            ingredientWithAvailability.quantity = curr.quantity;
            ingredientWithAvailability.expirationDateTimestamp = curr.expirationDateTimestamp;
        }
        return ingredientWithAvailability;
    });
};
