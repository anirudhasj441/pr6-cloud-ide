import React, { SyntheticEvent, useCallback, useState } from "react";
import Editor from "../components/Editor";
import { Tab, Tabs } from "@mui/material";
// import AceEditorComp from "../components/AceEditor";

const Workspace: React.FC = () => {
    const [tabValue, setTabValue] = useState(0)
    const onTabChange = useCallback((event: SyntheticEvent<Element, Event>, value: number) => {
        setTabValue(value)
    }, [setTabValue])
    return (
        <>
            <div className="h-full w-full flex flex-col">
                <Tabs value={tabValue} onChange={onTabChange} variant="scrollable" sx={{width: "100%"}}>
                    <Tab label="main.ts"></Tab>
                    <Tab label="index.ts"></Tab>
                    <Tab label="index.css"></Tab>
                </Tabs>
                <div className="flex-grow">
                <Editor />
                </div>
                {/* <AceEditorComp /> */}
            </div>
        </>
    );
};

export default Workspace;
