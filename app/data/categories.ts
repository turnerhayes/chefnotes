enum Category {
    VEGGIES = "Veggies",
    FRUITS = "Fruits",
    DAIRY = "Dairy",
    MEAT = "Meat",
    FISH = "Fish",
    GRAINS = "Grains",
    NUTS = "Nuts",
    OTHER = "Other",
}

export default Category;

export const ALL_CATEGORIES: Category[] = Object.values(Category).filter((val) => typeof val === "string");
