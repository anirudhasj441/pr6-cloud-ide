import { io } from "socket.io-client";

export default class WorkspaceSocket {
    private _socket;

    constructor(url: string) {
        this._socket = io(url);
    }

    get socket() {
        return this._socket;
    }
}
