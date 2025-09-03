# Expense-manager-electron-mongo-redis
A simple **Electron-based application** for tracking incomes and expenses.  
Built with **HTML, CSS, JavaScript**, and uses **MongoDB** and **Redis** as databases.

## Features
- Add new income or expense items with description and amount
- Store transactions in **MongoDB** (`items` collection)
- Maintain running totals in **Redis** (`income` and `expense` keys)
- Display total balance (income – expense) in real-time
- Show all items in a table (`date`, `title`, `income`, `expense`)

## Tech Stack
- Electron
- HTML, CSS
- JavaScript (frontend + backend logic)
- MongoDB (for item storage)
- Redis (for totals)

## Installation
1. Clone the repository
2. Install dependencies: npm install
3. Make sure MongoDB and Redis are running locally.
4. Start the app: npm start
