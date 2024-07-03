import {
    List,
    // ListItem,
    ListItemButton,
    ListItemIcon,
    Paper,
    SwipeableDrawer,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import FileExplorer from "../../components/FileExplorer";

const WorkSpaceLayout: React.FC = () => {
    const [explorerState, setExplorerState] = useState(false);
    return (
        <>
            <div className="h-svh w-svw flex">
                <div className="z-[9999]">
                    <Paper elevation={3} className="h-full" square>
                        <List component="div" disablePadding>
                            <ListItemButton
                                selected={explorerState}
                                sx={{
                                    "&.Mui-selected": {
                                        backgroundColor: "transparent",
                                        position: "relative",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            width: "0.15rem",
                                            height: "100%",
                                            top: 0,
                                            left: 0,
                                            backgroundColor: "white",
                                        },
                                    },
                                }}
                                onClick={() => setExplorerState(!explorerState)}
                            >
                                <ListItemIcon style={{ minWidth: 0 }}>
                                    <FileCopyTwoToneIcon fontSize="medium" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Paper>
                </div>
                <div className="flex-grow flex">
                    <SwipeableDrawer
                        anchor="left"
                        open={explorerState}
                        onOpen={() => setExplorerState(true)}
                        onClose={() => setExplorerState(false)}
                        variant="persistent"
                        sx={{
                            // position: "absolute",
                            // top: 0,
                            // left: 0,
                            width: explorerState ? 260 : 0,
                            // height: "100%",
                            // zIndex: 0,
                            // transition:
                            //     "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                            overflowX: "hidden",
                            textWrap: "nowrap",
                            "& .MuiPaper-root": {
                                position: "relative",
                                overflowX: "hidden",
                                transition: "none",
                            },
                        }}
                    >
                        <FileExplorer />
                    </SwipeableDrawer>
                    <div className=" flex-grow h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkSpaceLayout;
