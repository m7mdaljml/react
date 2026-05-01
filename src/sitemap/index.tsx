import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import MainLayout from "../presentation/pages/index";
import TodoApp from "../presentation/pages/todo-app";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/todo" replace />,
      },
      {
        path: "todo",
        element: <TodoApp />,
        handle: { label: { en: "TODO List", ar: "قائمة المهام" } },
      },
      {
        path: "*",
        element: <Navigate to="/todo" replace />,
      },
    ],
  },
];
