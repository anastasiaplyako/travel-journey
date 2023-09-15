import App from './App';
import React from 'react';
import './styles/app.css';
import ReactDOM from "react-dom/client";

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
        path: "/result",
        element: <Result />
    },
], {
    basename: process.env.PUBLIC_URL
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
