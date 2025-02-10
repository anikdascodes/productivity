# ⏰ Productivity Timer

A modern productivity management application built with React and TypeScript that helps you track your work sessions and manage tasks efficiently.

## ✨ Features

### 🕒 Timer
- Start/stop work sessions
- Track session duration
- Visual session progress indicator
- Session history with total duration

### ✅ Todo List
- Add and manage tasks
- Mark tasks as complete/incomplete
- Remove individual tasks
- Clear all tasks at once

### 📊 Summary
- View all completed sessions
- Track total productive time
- Delete individual sessions
- Clear all session history

### 🎨 User Interface
- Clean, modern design
- Dark mode support
- Responsive layout
- Smooth animations
- Beautiful gradients

## 🛠️ Tech Stack

- ⚛️ React 18
- 📘 TypeScript
- 🔧 Vite
- 🎨 TailwindCSS
- 🪄 Lucide Icons
- 📦 ESLint for code quality

## 🚀 Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd productivity-timer
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## 🔜 Upcoming Features

Check out [FEATURES.md](./FEATURES.md) for a detailed roadmap of upcoming features, including:

- 📊 Statistics and Analytics
- ⏰ Pomodoro Timer Mode
- 💾 Data Management
- 🏷️ Enhanced Categorization
- 📱 Progressive Web App (PWA)
- And much more!

## 🧰 Project Structure

```
src/
├── components/         # React components
│   ├── DateTime.tsx   # Current date/time display
│   ├── Summary.tsx    # Session summary
│   ├── Timer.tsx      # Main timer
│   └── TodoList.tsx   # Todo list management
├── hooks/             # Custom React hooks
│   ├── useTimer.ts    # Timer logic
│   └── useTodo.ts     # Todo management logic
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

