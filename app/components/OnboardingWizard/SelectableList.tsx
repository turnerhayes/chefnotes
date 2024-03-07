import { ChangeEvent, useCallback, useState } from "react";
import { Container, Input, InputAdornment, List, ListItemButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import fuzzysort from "fuzzysort";

const SelectableListItem = ({
    item,
    isSelected,
    onSelectionChanged,
}: {
    item: string;
    isSelected: boolean;
    onSelectionChanged: (item: string, isSelected: boolean) => void;
}) => {
    const handleClick = useCallback(() => {
        onSelectionChanged(item, !isSelected);
    }, [onSelectionChanged, item, isSelected]);

    return (
        <ListItemButton
            onClick={handleClick}
            selected={isSelected}
        >
            {item}
        </ListItemButton>
    );
};

export const SelectableList = ({
    items,
    selectedItems,
    updateSelectedItems,
    searchPlaceholder,
}: {
    items: string[];
    selectedItems: string[];
    updateSelectedItems: (items: string[]) => void;
    searchPlaceholder?: string;
}) => {
    const [searchString, setSearchString] = useState("");
    const [searchResults, setSearchResults] = useState(items);

    const handleSearchChanged = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const searchString = event.target.value;
        setSearchString(searchString);
        if (searchString.length === 0) {
            setSearchResults(items);
            return;
        }
        const results = fuzzysort.go(searchString, items);
        setSearchResults(results.map(({target}) => target));
    }, [setSearchResults, setSearchString, items]);

    const handleItemSelectionChanged = useCallback((item: string, isSelected: boolean) => {
        const set = new Set(selectedItems);
        if (!isSelected) {
            set.delete(item);
        }
        else {
            set.add(item);
        }
        updateSelectedItems(Array.from(set));
    }, [updateSelectedItems, selectedItems]);

    return (
        <Stack>
            <Container sx={{paddingTop: 2}}>
                <Input
                    fullWidth
                    value={searchString}
                    onChange={handleSearchChanged}
                    placeholder={searchPlaceholder}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            </Container>
            <List>
                {
                    searchResults.map((item) => (
                        <SelectableListItem
                            key={item}
                            item={item}
                            isSelected={selectedItems.includes(item)}
                            onSelectionChanged={handleItemSelectionChanged}
                        />
                    ))
                }
            </List>
        </Stack>
    );
};
