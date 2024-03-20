enum Unit {
    GRAMS = "g",
    MILLIGRAMS = "mg",
    LITERS = "L",
    MILLILITERS = "mL",
    POUNDS = "lbs",
    OUNCES = "oz",
}

export default Unit;

export const ALL_UNITS: Unit[] = Object.values(Unit).filter((val) => typeof val === "string");

