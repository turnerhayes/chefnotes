import { ChangeEvent, useCallback, useState } from "react";
import { Chip, Input, InputAdornment, Stack, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";


const CATEGORIES = [
    "Veggies",
    "Fruits",
    "Dairy",
    "Meat/Fish",
    "Grains",
];

const CategoryChip = ({
    category,
    isSelected,
    onSelected,
}: {
    category: string|null;
    isSelected: boolean;
    onSelected: (category: string|null) => void;
}) => {
    const onCategoryChipClick = useCallback(() => {
        onSelected(category);
    }, [onSelected, category]);
    
    return (
        <Chip
            label={category ?? "All"}
            onClick={onCategoryChipClick}
            variant={isSelected ?
                "outlined" :
                undefined}
        />
    );
};

const CategoryChipList = ({
    selectedCategory,
    setSelectedCategory,
}: {
    selectedCategory: string|null;
    setSelectedCategory: (category: string|null) => void;
}) => {
    const handleCategorySelected = useCallback((category: string|null) => {
        setSelectedCategory(category);
    }, [setSelectedCategory]);

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{paddingTop: 1, paddingBottom: 1, width: "100%", overflow: "auto",}}
        >
            <CategoryChip
                category={null}
                isSelected={selectedCategory === null}
                onSelected={handleCategorySelected}
            />
            {
                CATEGORIES.map((category) => (
                    <CategoryChip
                        key={category}
                        category={category}
                        isSelected={selectedCategory === category}
                        onSelected={handleCategorySelected}
                    />
                ))
            }
        </Stack>
    );
};


export const Pantry = () => {
    const [selectedCategory, setSelectedCategory] = useState<string|null>(null);
    const [searchString, setSearchString] = useState("");
    const [currentIngredients, setCurrentIngredients] = useState<string[]>([]);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchString(newValue);
    }, [setSearchString]);

    return (
        <Stack>
            <Input
                placeholder="Cheese, onion, lettuce, etc."
                value={searchString}
                onChange={handleSearchChange}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                sx={{paddingTop: 1}}
            />
            <CategoryChipList
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            {
                currentIngredients.length === 0 ? (
                    <Stack>
                        <Typography variant="h4" align="center" paddingTop={5}>
                            Nothing to eat here yet...
                        </Typography>
                        <Typography variant="h6" align="center">
                            Start adding ingredients from the categories above to
                            generate recipes from our AI chef!
                        </Typography>
                    </Stack>
                ) : null
            }
        </Stack>
    )
};
