import React from "react";
import { useState, useEffect, useRef } from "react";
import CodeEditor from "./utils/Editor";
import './style/index.scss'

const Editor: React.FC = () => {
    const [editor, setEditor] = useState<CodeEditor | undefined>(undefined);

    const editorRef = useRef(null);
    const mounted = useRef<boolean>(false);

    const createEditor = () => {
        if (editor) return;

        if (!editorRef.current) return;

        const new_editor: CodeEditor = new CodeEditor(editorRef.current);
        return new_editor;
    };

    useEffect(() => {
        console.log(mounted.current);
        if (mounted.current) return
        console.log("editorRef: ", editorRef.current);
        if (editorRef.current) {
            let editor = createEditor();
            setEditor(editor)
        }
        return () => {
            console.log("Unmounting... ")
            mounted.current = true;
            editor?.dispose();
        };
    }, []);

    return (
        <>
            <div
                id="editor"
                className="h-full w-full relative"
                ref={editorRef}
            ></div>
        </>
    );
};

export default Editor;
