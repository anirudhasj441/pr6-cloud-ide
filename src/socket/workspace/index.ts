import { io } from "socket.io-client";

export default class WorkspaceSocket {
    private _socket;

    constructor(url: string) {
        this._socket = io(url);
    }

    disconnect = () => {
        this._socket.disconnect();
        this._socket.close();
    };

    get socket() {
        return this._socket;
    }
}
