export const KNOWLEDGE_BASE = `# Welcome to this website

This website is a collection of 5 practical mini-apps, one per navigation tab. They were built to help people learn and practice building web apps with React. Visitors can use all of them for free. The whole site can be used in English, Arabic, and French (the Arabic version flips the layout to read from right to left).

The tabs in the top menu are:

| Tab | What it is |
| --- | ---------- |
| 1 | TODO List |
| 2 | Weather |
| 3 | Expense Tracker |
| 4 | Tasks Board |
| 5 | AI Assistant |

## 1. TODO List app

A simple app to keep track of your tasks or "to-dos".

What you can do:
- Type a task in the text box and press the "Add" button to create it.
- Mark a task as done with the check button — done tasks are shown crossed out and in green.
- Delete a task with the trash button.
- Every task shows the date and time it was created.
- Your tasks are saved automatically in your browser, so they are still there when you close the page and come back.

Helpful warnings:
- If you try to add an empty task, the app shows "Please enter a task".
- If you try to add a task that already exists (and is still not done), the app warns you.

Filtering and exporting:
- You can filter the list: search by text, show only done / only not-done / all tasks, pick a specific date, and sort tasks from oldest to newest or newest to oldest.
- You can download the filtered list as an Excel file with the "Export" button.

## 2. Weather app

A live weather app. Type any city name, press search, and see the current weather for that place.

What you see after searching:
- The city name and country, plus a short description of the weather (like "clear sky").
- The current temperature in Celsius, how it actually feels, and the highest/lowest temperature of the day.
- Humidity (%), wind speed, air pressure, visibility in km, and the sunrise and sunset times for that city.
- A big weather icon and a colored background that match the weather (storm, rain, snow, fog, clear or cloudy).

Friendly touches:
- If the city is not found, the app shows a clear "city not found" message instead of breaking.
- Before you search anything, it shows a friendly prompt telling you to type a city.
- The weather info is always shown in Celsius (metric units).

## 3. Expense Tracker

A personal finance app to record your money coming in and going out. It has two pages: "Dashboard" and "Transactions".

Adding transactions:
- Click "Create new transaction" and fill in: a title, the amount, whether it is Income or Expense, a category, and a date.
- Categories you can choose: Food, Transportation, Housing, Utilities, Salaries, Investments, Shopping, and Entertainment.
- The money is shown in the local currency (JD - Jordanian Dinar).
- You can edit or delete any transaction later.

Transactions page:
- Lists all your transactions in a table.
- You can filter them by title, type (income/expense), and category.
- Nice empty/loading messages while data loads or when there is nothing to show.

Dashboard page:
- Three big cards at the top: your current Balance (income minus expenses), Total Income, and Total Expenses.
- A monthly overview chart that compares income and expenses over the months.
- Two more charts showing your income by category and your expenses by category.

Note: unlike the other apps, this one keeps its data on a server (PHP + MySQL database), so the transactions are shared and stored server-side.

## 4. Tasks Board

A Kanban-style board to manage team tasks in stages. It has four columns: To Do, In Progress, Review, and Done.

Adding a task:
- Click "Add new task" and fill in: a title, a description, who it is assigned to, the estimated time (in hours), and the priority (Low, Medium, or High).
- Tasks are always added to the first column (To Do).

Working with tasks:
- Move a task forward to the next stage using the small "..." menu on the card (the "Move to next step" option), or simply drag and drop it onto another column.
- Edit a task (available on the To Do column) and delete any task.
- Each card shows the title, description, a colored priority badge (red for High, yellow for Medium, green for Low), the assigned person with their photo or initials and job title, and the estimated time.
- Success notifications (toast messages) appear after every action, like adding, moving, editing, or deleting a task.

Filtering and exporting:
- You can filter the board by task title, assignee, and priority.
- You can export the whole board to an Excel file, with one sheet per column.

The team members you can assign tasks to are: Mohammad Aljamal, Yamen Aljamal, Majdy Aljamal, Ahmad Aljamal, and Sophia. Your board is saved automatically in your browser.

## 5. AI Assistant

A chat assistant that knows everything about this website. You can talk to it like a friend and ask about any part of the site.

What you can do:
- Ask questions about the TODO List, Weather, Expense Tracker, or Tasks Board apps, and it will answer in simple, easy-to-understand language.
- It shows a "Typing..." status while it is thinking.
- You can clear the conversation with the "Delete conversation" button.
- A smaller version of the chat is always available as a floating "AI" button in the corner of every page, so you can ask from anywhere.

If the assistant does not know the answer:
- When you ask something that is not about this website, the assistant cannot answer it. Instead, it invites you to leave your email so the site owner can contact you about your question.
- An email box appears right inside the chat. Type your email and press "Send", or press "Cancel" to dismiss the box and keep chatting.
- If you send your email, a notification email is sent to the site owner with your email and your question, so they can get back to you. The chat then confirms that the owner will contact you.`;

