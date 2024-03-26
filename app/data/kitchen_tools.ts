enum KitchenTool {
    STOVE_TOP = "Stove Top",
    OVEN = "Oven",
    SKILLET = "Skillet",
    POTS = "Pots",
    PANS = "Pans",
    MICROWAVE ="Microwave",
    BLENDER = "Blender",
    KNIVES = "Knives",
    MIXING_BOWLS = "Mixing Bowls",
    STAND_MIXER = "Stand Mixer",
};

export default KitchenTool;

export const ALL_KITCHEN_TOOLS: KitchenTool[] = Object.values(KitchenTool)
    .filter((val) => typeof val === "string");
