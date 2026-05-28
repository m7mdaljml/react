import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import MainLayout from "../presentation/pages/index";
import TodoApp from "../presentation/pages/todo-app";
import WeatherApp from "../presentation/pages/weather";
import ExpenseTracker from "../presentation/pages/expense-tracker";

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
        path: "weather",
        element: <WeatherApp />,
        handle: { label: { en: "Weather", ar: "الطقس" } },
      },
      {
        path: "expense-tracker",
        element: <ExpenseTracker />,
        handle: { label: { en: "Expense Tracker", ar: "تتبع المصروفات" } },
      },
      {
        path: "*",
        element: <Navigate to="/todo" replace />,
      },
    ],
  },
];
