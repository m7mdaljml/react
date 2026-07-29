import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import MainLayout from "../presentation/pages";
import TodoApp from "../presentation/pages/todo-app";
import WeatherApp from "../presentation/pages/weather";
//Expense Tracker Paths
import ExpenseTrackerLayout from "../presentation/pages/expense-tracker";
import ExpenseDashboard from "../presentation/pages/expense-tracker/content/dashboard";
import ExpenseTransactions from "../presentation/pages/expense-tracker/content/transactions";
import TasksBoard from "../presentation/pages/tasks-board";
import AIChat from "../presentation/pages/ai-chat";

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
        handle: {
          label: {
            en: "TODO List",
            ar: "قائمة المهام",
            fr: "Liste des tâches",
          },
        },
      },
      {
        path: "weather",
        element: <WeatherApp />,
        handle: { label: { en: "Weather", ar: "الطقس", fr: "Météo" } },
      },
      {
        path: "expense-tracker",
        element: <ExpenseTrackerLayout />,
        handle: {
          label: {
            en: "Expense Tracker",
            ar: "تتبع المصروفات",
            fr: "Suivi des dépenses",
          },
        },
        children: [
          {
            path: "dashboard",
            element: <ExpenseDashboard />,
            handle: {
              label: {
                en: "Dashboard",
                ar: "لوحة التحكم",
                fr: "Tableau de bord",
              },
            },
          },
          {
            path: "transactions",
            element: <ExpenseTransactions />,
            handle: {
              label: {
                en: "Transactions",
                ar: "المعاملات",
                fr: "Transactions",
              },
            },
          },
        ],
      },
      {
        path: "tasks-board",
        element: <TasksBoard />,
        handle: {
          label: {
            en: "Tasks Board",
            ar: "لوحة المهام ",
            fr: "Tableau des tâches",
          },
        },
      },
      {
        path: "ai-assistant",
        element: <AIChat />,
        handle: {
          label: {
            en: "AI assistant",
            ar: "المساعد الذكي ",
            fr: "Assistant IA",
          },
        },
      },

      {
        path: "*",
        element: <Navigate to="/todo" replace />,
      },
    ],
  },
];
