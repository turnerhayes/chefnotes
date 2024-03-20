import Category from "./categories";
import Unit from "./units";

export interface Ingredient {
    id: string;
    name: string;
    unitOptions: Unit[];
    categories: Category[];
}

const ingredients: Ingredient[] = [
    {
        id: "salmon",
        name: "Salmon",
        unitOptions: [
            Unit.GRAMS,
            Unit.MILLIGRAMS,
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
        ],
        categories: [
            Category.MEAT,
        ],
    },
];


export default ingredients;
