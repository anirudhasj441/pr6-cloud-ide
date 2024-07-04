import { Terminal } from "@xterm/xterm";
import React, { useEffect, useRef } from "react";
import workspaceSocket from "../../socket/workspace";

import "@xterm/xterm/css/xterm.css";
import "./style/index.scss";

const IntegratedTerminal: React.FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const mounted = useRef<boolean>(false);
    const terminal = useRef<Terminal | undefined>(undefined);

    useEffect(() => {
        console.log("mounted: ", mounted.current);
        workspaceSocket.on("terminal:data", (data) => {
            terminal.current?.write(data);
        });
        if (mounted.current) return;
        if (!terminal.current)
            terminal.current = new Terminal({
                cols: 80,
                rows: 20,
                allowTransparency: true,
            });
        if (terminalRef.current) terminal.current.open(terminalRef.current);
        console.log("emitting...");
        workspaceSocket.emit("terminal:write", "\n");

        terminal.current.onData((data: string) => {
            workspaceSocket.emit("terminal:write", data);
        });
        return () => {
            mounted.current = true;
            console.log("unmount terminal..");
            workspaceSocket.off("terminal:data");
        };
    }, []);

    return (
        <>
            <div
                id="terminal"
                ref={terminalRef}
                className="h-full w-full px-2"
            ></div>
        </>
    );
};

export default IntegratedTerminal;
