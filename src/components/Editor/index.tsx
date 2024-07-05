import React, { useCallback } from "react";
import { useState, useEffect, useRef, memo } from "react";
import CodeEditor from "./utils/Editor";
import "./style/index.scss";
import workspaceSocket from "../../socket/workspace";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";

interface EditorProps {
    filePath: string;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
    console.log("Editor rendering..");
    const [editor, setEditor] = useState<CodeEditor | undefined>(undefined);
    const editorRef = useRef(null);
    const mounted = useRef<boolean>(false);

    const createEditor = () => {
        if (editor) return;

        if (!editorRef.current) return;

        const new_editor: CodeEditor = new CodeEditor(editorRef.current);
        return new_editor;
    };

    const fetchFileContent = useCallback(async () => {
        if (!props.filePath || props.filePath === "") return;
        const url: string = import.meta.env.VITE_SERVER_URL + "/open_file";

        const res = await fetch(url, {
            method: "POST",
            headers: [["Content-Type", "Application/json"]],
            body: JSON.stringify({ filePath: props.filePath }),
        });
        const response = await res.json();
        // editor?.setText(response.content);
        return response.content;
    }, [props.filePath]);

    const save = () => {
        console.log(props.filePath);
        workspaceSocket.emit("file:save", props.filePath, editor?.getText());
    };

    useEffect(() => {
        console.log("filePath: ", props.filePath);
        if (!props.filePath || props.filePath === "") return;
        fetchFileContent().then(editor?.setText);
    }, [props.filePath]);

    useEffect(() => {
        console.log(mounted.current);
        if (mounted.current) return;
        if (editorRef.current) {
            let new_editor = createEditor();
            setEditor(new_editor);
        }

        console.log("editorRef: ", editor);
        return () => {
            console.log("Unmounting... ");
            mounted.current = true;
            editor?.dispose();
        };
    }, []);

    return (
        <>
            <div id="editor" className="h-full w-full flex flex-col">
                <div className=" bg-[#272822] flex">
                    <div className="text-sm">
                        {props.filePath &&
                            props.filePath
                                .split("/root/")[1]
                                .split("/")
                                .join(" > ")}
                    </div>
                    <div className="flex-grow text-right">
                        <IconButton onClick={save}>
                            <SaveIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="flex-grow relative" ref={editorRef}></div>
            </div>
        </>
    );
};

export default memo(Editor);
