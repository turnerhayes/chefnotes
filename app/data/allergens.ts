enum Allergen {
    PEANUTS = "Peanuts",
    STRAWBERRIES = "Strawberries",
    SHELLFISH = "Shellfish",
};

export default Allergen;

export const ALL_ALLERGENS: Allergen[] = Object.values(Allergen)
    .filter((val) => typeof val === "string");
