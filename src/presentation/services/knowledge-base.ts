export const KNOWLEDGE_BASE = `# React + TypeScript + Vite

This project is designed for learning React through a collection of practical applications that demonstrate different React concepts, patterns, and features.

Each navigation tab represents a standalone project.

## Included Projects

| Tab | Project            |
| --- | ------------------ |
| 1   | TODO List          |
| 2   | Weather App        |
| 3   | Expense Tracker    |
| 4   | Tasks Board        |
| 5   | AI Assistant       |

## Tab 1: TODO List App

A simple and interactive TODO list application built with React, featuring task management (add, delete, mark as completed), task creation date display, multi-language support using i18n, persistent storage with localStorage, and Bootstrap styling.

## Tab 2: Weather App

A real-time weather application built with React that fetches live data from the OpenWeather API. Features: search by city, live weather data, dynamic background based on weather, weather condition icons, temperature/feels-like/min/max display, humidity, wind speed, visibility, sunrise/sunset times (timezone-aware), multi-language support using i18n, error handling for invalid cities, responsive UI using Bootstrap + custom CSS. Uses axios for API requests.

## Tab 3: Expense Tracker

A full-stack expense management app built with React, TypeScript, PHP, and MySQL. Features: create/edit/delete transactions, filter transactions, track Income and Expense, dashboard with financial overview, monthly income vs expense chart, income/expense distribution by category, balance calculation, multi-language support using i18n, Bootstrap UI, loading/empty states. Backend powered by PHP REST APIs with MySQL. Uses axios for API communication, ECharts for charts.

## Tab 4: Tasks Board

A Kanban-style task management board built with React. Features: add tasks with title/description/assignee/estimated time/priority, move tasks via action menu or drag and drop, edit/delete tasks, filter by title/priority/assignee, priority badges (High/Medium/Low), assignee display with avatar initials, estimated time tracking, color-coded columns, drag-over feedback, multi-language support using i18n, persistent storage with localStorage, Bootstrap styling. Uses native HTML5 Drag and Drop API.

## Tab 5: AI Assistant

An AI-powered chat assistant built with React that integrates with the Groq API (Llama 3.1). Features: real-time chat, powered by Groq API (llama-3.1-8b-instant), loading state with status indicator, clean centered card UI styled with Bootstrap, multi-language support using i18n (EN / AR / FR), error handling. Uses native fetch with Bearer token auth, environment variables via .env (VITE_AI_API_URL, VITE_AI_API_KEY).`;
