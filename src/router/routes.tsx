import { RouteObject } from "react-router-dom";
import WorkSpaceLayout from "../layout/WorkSpaceLayout";
import Workspace from "../pages/Workspace";
import App from "../App";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/workspace/",
        element: <WorkSpaceLayout />,
        children: [
            {
                path: "",
                element: <Workspace />,
            },
        ],
    },
];

export default routes;
