import { RouteObject } from "react-router-dom";
import Workspace from "../pages/Workspace";
import App from "../App";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/workspace/",
        element: <Workspace />,
    },
];

export default routes;
