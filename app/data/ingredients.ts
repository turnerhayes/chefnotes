import Category from "./categories";
import Unit from "./units";


const ingredients = [
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
] as const;

export type IngredientId = typeof ingredients[number]['id'];


export interface Ingredient {
    id: IngredientId;
    name: string;
    unitOptions: readonly Unit[];
    categories: readonly Category[];
}

export default ingredients as readonly Ingredient[];


export interface Quantity {
    amount: number;
    unit?: Unit;
}

export interface QuantifiedIngredient {
    ingredientId: IngredientId;
    quantity: Quantity;
}

export interface AvailableIngredient extends QuantifiedIngredient {
    expirationDateTimestamp?: number;
}

export type IngredientWithAvailability = Ingredient & Omit<
    AvailableIngredient, "ingredientId"
>;

const addAvailabilityToIngredient = <T extends QuantifiedIngredient>(
    ingredient: Ingredient,
    available: T|undefined
): IngredientWithAvailability => {
    if (!available) {
        return ingredient as IngredientWithAvailability;
    }

    const withAvailability: IngredientWithAvailability = {
        ...ingredient,
        quantity: available.quantity,
    };

    if ("expirationDateTimestamp" in available) {
        withAvailability.expirationDateTimestamp = (
            available as AvailableIngredient
        ).expirationDateTimestamp;
    }

    return withAvailability;
};

export const addAvailabilityToIngredients = <T extends QuantifiedIngredient>(
    available: T[],
    excludeUnavailable: boolean = false
): IngredientWithAvailability[] => {
    const availableById = available.reduce(
        (ingredientMap, available) => ({
            ...ingredientMap,
            [available.ingredientId]: available,
        }), {} as Partial<{[id in IngredientId]: T}>
    );

    const withAvailability = ingredients.map((ingredient) => addAvailabilityToIngredient(
        ingredient,
        availableById[ingredient.id]
    ));

    return excludeUnavailable ?
        withAvailability.filter((ingredient) => Boolean(ingredient.quantity)) :
        withAvailability;
};
