import { Terminal } from "@xterm/xterm";
import React, { useEffect, useRef } from "react";
import WorkspaceSocket from "../../socket/workspace";

import "@xterm/xterm/css/xterm.css";
import "./style/index.scss";

const IntegratedTerminal: React.FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const mounted = useRef<boolean>(false);
    const terminal = useRef<Terminal | undefined>(undefined);
    const socket = useRef<WorkspaceSocket | undefined>(undefined);

    useEffect(() => {
        if (mounted.current) return;
        if (!terminal.current)
            terminal.current = new Terminal({
                cols: 80,
                rows: 20,
                allowTransparency: true,
            });
        if (terminalRef.current) terminal.current.open(terminalRef.current);
        if (!socket.current)
            socket.current = new WorkspaceSocket("http://127.0.0.1:8000");
        socket.current?.socket.emit("terminal:write", "\n");
        socket.current.socket?.on("terminal:data", (data) => {
            terminal.current?.write(data);
        });
        terminal.current.onData((data: string) => {
            socket.current?.socket.emit("terminal:write", data);
        });

        return () => {
            mounted.current = true;
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
