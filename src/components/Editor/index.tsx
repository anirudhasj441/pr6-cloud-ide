import React from "react";
import { useState, useEffect, useRef } from "react";
import CodeEditor from "./utils/Editor";
import "./style/index.scss";

interface EditorProps {
    filePath: string;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
    const [editor, setEditor] = useState<CodeEditor | undefined>(undefined);

    const editorRef = useRef(null);
    const mounted = useRef<boolean>(false);

    const createEditor = () => {
        if (editor) return;

        if (!editorRef.current) return;

        const new_editor: CodeEditor = new CodeEditor(editorRef.current);
        return new_editor;
    };

    const fetchFileContent = async () => {
        const url: string = "http://127.0.0.1:8000/open_file";

        const res = await fetch(url, {
            method: "POST",
            headers: [["Content-Type", "Application/json"]],
            body: JSON.stringify({ filePath: props.filePath }),
        });
        const response = await res.json();
        editor?.setText(response.content);
    };

    useEffect(() => {
        console.log("filePath: ", props.filePath);
        if (!props.filePath || props.filePath === "") return;
        fetchFileContent();
    }, [props.filePath]);

    useEffect(() => {
        console.log(mounted.current);
        if (mounted.current) return;
        console.log("editorRef: ", editorRef.current);
        if (editorRef.current) {
            let editor = createEditor();
            setEditor(editor);
        }
        return () => {
            console.log("Unmounting... ");
            mounted.current = true;
            editor?.dispose();
        };
    }, []);

    return (
        <>
            <div id="editor" className="h-full w-full flex flex-col">
                <div className="text-sm bg-[#272822]">
                    {props.filePath &&
                        props.filePath
                            .split("/root/")[1]
                            .split("/")
                            .join(" > ")}
                </div>
                <div className="flex-grow relative" ref={editorRef}></div>
            </div>
        </>
    );
};

export default Editor;
