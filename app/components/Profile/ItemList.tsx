import { useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";


const ItemListItem = <T extends string>({
    item,
    onDelete,
}: {
    item: T;
    onDelete: (item: T) => void;
}) => {
    const handleDeleteClick = useCallback(() => {
        onDelete(item);
    }, [
        onDelete,
        item,
    ]);

    return (
        <ListItem
            secondaryAction={
                <IconButton
                    onClick={handleDeleteClick}
                >
                    <DeleteIcon
                    />
                </IconButton>
            }
        >
            <ListItemText
                primaryTypographyProps={{
                    variant: "h5",
                }}
            >
                {item}
            </ListItemText>
        </ListItem>
    );
};

export const ItemList = <T extends string>({
    items,
    onDelete,
}: {
    items: T[];
    onDelete: (item: T) => void;
}) => {
    return (
        <List>
            {
                items.map((item) => (
                    <ItemListItem
                        key={item}
                        item={item}
                        onDelete={onDelete}
                    />
                ))
            }
        </List>
    );
};
