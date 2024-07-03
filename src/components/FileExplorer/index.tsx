import React from "react";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

const FileExplorer: React.FC = () => {
    const MUI_X_PRODUCTS: TreeViewBaseItem[] = [
        {
            id: "grid",
            label: "Data Grid",
            children: [
                { id: "grid-community", label: "@mui/x-data-grid" },
                { id: "grid-pro", label: "@mui/x-data-grid-pro" },
                { id: "grid-premium", label: "@mui/x-data-grid-premium" },
            ],
        },
        {
            id: "pickers",
            label: "Date and Time Pickers",
            children: [
                { id: "pickers-community", label: "@mui/x-date-pickers" },
                { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
            ],
        },
        {
            id: "charts",
            label: "Charts",
            children: [{ id: "charts-community", label: "@mui/x-charts" }],
        },
        {
            id: "tree-view",
            label: "Tree View",
            children: [
                { id: "tree-view-community", label: "@mui/x-tree-view" },
            ],
        },
    ];

    return (
        <>
            <RichTreeView
                items={MUI_X_PRODUCTS}
                slots={{
                    expandIcon: FolderRoundedIcon,
                    collapseIcon: FolderOpenRoundedIcon,
                    endIcon: InsertDriveFileRoundedIcon,
                }}
            />
        </>
    );
};

export default FileExplorer;
