import React from "react";
import Editor from "./components/Editor";

const App: React.FC = () => {
    return (
        <>
            <div className="h-svh w-svw">
                <Editor />
            </div>
        </>
    );
};

export default App;
