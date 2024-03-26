enum DietaryRestriction {
    VEGAN = "Vegan",
    VEGETARIAN = "Vegetarian",
    PESCETARIAN = "Pescetarian",
    DAIRY_FREE = "Dairy-Free",
    KOSHER = "Kosher",
    HALAL = "Halal",
    KETO = "Keto",
    GLUTEN_FREE = "Gluten-Free",
};

export default DietaryRestriction;

export const ALL_DIETARY_RESTRICTIONS: DietaryRestriction[] = Object.values(DietaryRestriction)
    .filter((val) => typeof val === "string");
