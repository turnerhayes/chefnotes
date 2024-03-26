"use client";

import { useCallback, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import KitchenTool, { ALL_KITCHEN_TOOLS } from "@/app/data/kitchen_tools";
import { addKitchenTool, removeKitchenTool } from "@/redux/slices/profile";
import { AddItemDrawer } from "./AddItemDrawer";
import { ItemList } from "./ItemList";


export const Equipment = () => {
    const dispatch = useAppDispatch();
    const tools = useAppSelector((state) => state.profile.kitchenTools);
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)

    const handleAddClick = useCallback(() => {
        setIsAddDrawerOpen(true);
    }, [
        setIsAddDrawerOpen,
    ]);

    const handleAddDrawerClose = useCallback(() => {
        setIsAddDrawerOpen(false);
    }, [
        setIsAddDrawerOpen,
    ]);

    const handleAddTool = useCallback((tool: KitchenTool) => {
        dispatch(addKitchenTool(tool));
    }, [
        dispatch,
    ]);

    const handleDeleteTool = useCallback((tool: KitchenTool) => {
        dispatch(removeKitchenTool(tool));
    }, [
        dispatch,
    ]);

    return (
        <Stack
            width="100%"
            height="100%"
        >
            <Stack
                component="header"
                direction="row"
            >
                <IconButton onClick={handleAddClick}>
                    <AddIcon
                        sx={{
                            fontSize: 40,
                        }}
                    />
                </IconButton>
            </Stack>
            <Stack
                flexGrow={1}
            >
                {
                    tools.length === 0 ? (
                        <Container
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h5" align="center">
                                No tools added
                            </Typography>
                        </Container>
                    ) : (
                        <ItemList
                            items={tools}
                            onDelete={handleDeleteTool}
                        />
                    )
                }
                <AddItemDrawer
                    currentItems={tools}
                    isOpen={isAddDrawerOpen}
                    allItems={ALL_KITCHEN_TOOLS}
                    onClose={handleAddDrawerClose}
                    selectLabel="Tool:"
                    onAdd={handleAddTool}
                />
            </Stack>
        </Stack>
    )
};
