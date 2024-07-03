import React from "react";
import Editor from "../components/Editor";
// import AceEditorComp from "../components/AceEditor";

const Workspace: React.FC = () => {
    return (
        <>
            <div className="h-full w-full">
                <Editor />
                {/* <AceEditorComp /> */}
            </div>
        </>
    );
};

export default Workspace;
