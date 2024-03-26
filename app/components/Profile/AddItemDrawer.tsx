import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Stack from "@mui/material/Stack";

export const AddItemDrawer = <T extends string>({
    isOpen,
    selectLabel,
    currentItems,
    allItems,
    onClose,
    onAdd,
}: {
    isOpen: boolean;
    selectLabel: string;
    currentItems: T[];
    allItems: T[];
    onClose: () => void;
    onAdd: (item: T) => void;
}) => {
    const [selectedItem, setSelectedItem] =
        useState<T|null>(null);

    const availableItems = allItems.filter(
        (res) => !currentItems.includes(res)
    );

    const handleSelectChange = useCallback(
        (event: SelectChangeEvent<T>) => {
            const item = (event.target as {
                value: T;
            }).value;
            setSelectedItem(item);
        },
        [
            setSelectedItem,
        ]
    );

    const handleCancel = useCallback(() => {
        onClose();
    }, [
        onClose,
    ]);

    const handleAdd = useCallback(() => {
        if (selectedItem !== null) {
            onAdd(selectedItem);
            onClose();
            setSelectedItem(null);
        }
    }, [
        onAdd,
        onClose,
        selectedItem,
    ]);

    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            anchor="bottom"
        >
            <Stack>
                <FormControl>
                    <FormLabel>
                        {selectLabel}
                    </FormLabel>
                    <Select
                        value={selectedItem ?? ""}
                        onChange={handleSelectChange}
                    >
                    {
                        availableItems.map((item) => (
                            <MenuItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
                <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                    padding={1}
                >
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                </Stack>
            </Stack> 
        </Drawer>
    );
};
