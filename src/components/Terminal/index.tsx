import { Terminal } from "@xterm/xterm";
import React, { useEffect, useRef } from "react";

import "@xterm/xterm/css/xterm.css";

const IntegratedTerminal: React.FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const mounted = useRef<boolean>(false);
    const terminal = useRef<Terminal | undefined>(undefined);

    useEffect(() => {
        if (mounted.current) return;
        if (!terminal.current) terminal.current = new Terminal({});
        if (terminalRef.current) terminal.current.open(terminalRef.current);
        terminal.current.write(
            "devil@devil-Inspiron-3542:~/Projects/pr6-cloud-ide/dev/pr6-cloud-ide$"
        );

        return () => {
            mounted.current = true;
        };
    }, []);

    return (
        <>
            <div
                id="terminal"
                ref={terminalRef}
                className="h-full w-full"
            ></div>
        </>
    );
};

export default IntegratedTerminal;
