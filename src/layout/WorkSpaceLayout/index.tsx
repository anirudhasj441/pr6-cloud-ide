import {
    List,
    ListItemButton,
    ListItemIcon,
    SwipeableDrawer,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import FileExplorer from "../../components/FileExplorer";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

const WorkSpaceLayout: React.FC = () => {
    const [explorerState, setExplorerState] = useState(false);

    // const [drawerWidth, setDrawerWidth] = useState(0);

    const [splitSizes, setSplitSizes] = useState([0, "auto"])

    const toggleDrawer = (): void => {
        setSplitSizes([!explorerState ? 260 : 0, "auto"])
        setExplorerState(!explorerState);
    }

    return (
        <>
            <div className="h-svh w-svw flex">
                <div className="z-[9999]">
                    <div className="h-full bg-[#272822]">
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
                                onClick={toggleDrawer}
                            >
                                <ListItemIcon style={{ minWidth: 0 }}>
                                    <FileCopyTwoToneIcon fontSize="medium" style={{opacity: explorerState? 1 : .65}} />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </div>
                </div>
                <div className="flex-grow flex">
                    <SplitPane split="vertical" sizes={splitSizes} onChange={setSplitSizes}>
                        <Pane minSize={0} maxSize='80%'>
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
                                    width: splitSizes[0],
                                    height: "100%",
                                    // zIndex: 0,
                                    transition:
                                        "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                                    overflowX: "hidden",
                                    textWrap: "nowrap",
                                    "& .MuiPaper-root": {
                                        position: "relative",
                                        overflowX: "hidden",
                                        transition: "none",
                                    },
                                }}
                            >
                                <div className="bg-[#222218] px-3 py-2">
                                    <div className="text-[0.7rem]">EXPLORER</div>
                                </div>
                                <FileExplorer />
                            </SwipeableDrawer>
                        </Pane>
                        <div className=" flex-grow h-full">
                            <Outlet />
                            {/* <div className="h-full w-full bg-red-500"></div> */}
                        </div>
                    </SplitPane>
                </div>
            </div>
        </>
    );
};

export default WorkSpaceLayout;
