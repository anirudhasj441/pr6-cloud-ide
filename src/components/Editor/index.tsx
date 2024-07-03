import React from "react";

import { useState, useEffect, useRef } from "react";
import CodeEditor from "./utils/Editor";

const Editor: React.FC = () => {
    const [editor, setEditor] = useState<CodeEditor | null>(null);

    const editorRef = useRef<HTMLDivElement | null>(null);
    const mounted = useRef<boolean>(false);

    const createEditor = () => {
        if (editor) return;

        if (!editorRef) return;

        const new_editor: CodeEditor = new CodeEditor(editorRef.current);

        setEditor(new_editor);
    };

    useEffect(() => {
        console.log("editorRef: ", editorRef.current);
        console.log(mounted.current);
        if (mounted.current) return;
        if (editorRef) {
            createEditor();
        }

        return () => {
            mounted.current = true;
            editor?.dispose();
        };
    }, [editorRef.current]);

    return (
        <>
            <div
                className="h-full w-full"
                style={{ resize: "vertical" }}
                ref={editorRef}
            ></div>
        </>
    );
};

export default Editor;
