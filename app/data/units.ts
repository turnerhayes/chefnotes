enum Unit {
    GRAMS = "g",
    MILLIGRAMS = "mg",
    LITERS = "L",
    MILLILITERS = "mL",
}

export default Unit;

export const ALL_UNITS: Unit[] = Object.values(Unit).filter((val) => typeof val === "string");

