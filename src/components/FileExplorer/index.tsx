import React, {
    SyntheticEvent,
    forwardRef,
    Ref,
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import {
    TreeItem2Content,
    TreeItem2GroupTransition,
    TreeItem2Icon,
    TreeItem2IconContainer,
    TreeItem2Label,
    TreeItem2Props,
    TreeItem2Provider,
    TreeItem2Root,
} from "@mui/x-tree-view";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2/useTreeItem2";
import { Box } from "@mui/material";

const TreeNode = forwardRef(
    (props: TreeItem2Props, ref: Ref<HTMLLIElement> | undefined) => {
        const {
            id,
            itemId,
            label,
            disabled,
            children,
            ...other
        }: TreeItem2Props = props;
        // other
        const {
            getRootProps,
            getContentProps,
            getLabelProps,
            getGroupTransitionProps,
            getIconContainerProps,
            status,
        } = useTreeItem2({
            id,
            itemId,
            children,
            label,
            disabled,
            rootRef: ref,
        });
        return (
            <TreeItem2Provider itemId={itemId}>
                <TreeItem2Root
                    // @ts-ignore
                    {...getRootProps(other)}
                    // onClick={() => if())}
                >
                    <TreeItem2Content {...getContentProps()}>
                        <TreeItem2IconContainer {...getIconContainerProps()}>
                            <TreeItem2Icon status={status} />
                        </TreeItem2IconContainer>
                        <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
                            {/* <TreeItem2Checkbox {...getCheckboxProps()} /> */}
                            <TreeItem2Label {...getLabelProps()} />
                        </Box>
                    </TreeItem2Content>
                    {children && (
                        <TreeItem2GroupTransition
                            {...getGroupTransitionProps()}
                        />
                    )}
                </TreeItem2Root>
            </TreeItem2Provider>
        );
    }
);

const FileExplorer: React.FC = () => {
    const mounted = useRef<boolean>(false);
    const [FileTree, setFileTree] = useState<TreeViewBaseItem[]>([]);

    const onNodeSelect = (
        event: SyntheticEvent,
        itemId: string,
        isSelected: boolean
    ) => {
        event;
        console.log(itemId, ": ", isSelected);
    };

    const fetcFileTree = useCallback(async () => {
        const url = "http://127.0.0.1:8000/list_dir";
        const res = await fetch(url);
        const tree = await res.json();
        return tree.tree;
    }, []);

    useEffect(() => {
        if (mounted.current) return;
        mounted.current = true;
        fetcFileTree().then(setFileTree);
    }, []);

    return (
        <>
            <RichTreeView
                items={FileTree}
                slots={{
                    expandIcon: FolderRoundedIcon,
                    collapseIcon: FolderOpenRoundedIcon,
                    endIcon: InsertDriveFileRoundedIcon,
                    item: TreeNode,
                }}
                onItemSelectionToggle={onNodeSelect}
            />
        </>
    );
};

export default FileExplorer;
