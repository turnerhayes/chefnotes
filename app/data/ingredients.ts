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
