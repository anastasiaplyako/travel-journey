import App from './App';
import React from 'react';
import './styles/app.css';

import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Result from "./pages/result";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App />
        ),
    },
    {
        path: "result",
        element: <Result />
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
