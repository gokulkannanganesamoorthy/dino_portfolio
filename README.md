# GOKUL KANNAN GANESAMOORTHY: The Offline Portfolio

> _"The internet is down. But my portfolio isn't."_

A minimalist, interactive portfolio inspired by the legendary Chromium "No Internet" Dino Game.
Built with **React**, **Tailwind CSS**, and a custom **1-Bit Physics Engine**.

![Dino Run Trailer](src/assets/demo.mp4)

## 🎮 How to Play

**Objective**: Survive the desert to reach the developer.

- **Desktop**:
  - `[SPACE]` or `[ARROW UP]`: **JUMP** / **START**
  - `[SPACE]` (Mid-air): Not supported (Classic Physics)
- **Mobile**:
  - `[TAP ANYWHERE]`: **JUMP** / **START**
- **Lazy Mode**:
  - **Auto-Pilot**: Toggle the button in the top-left to let the AI play for you.

## 🛠️ Tech Stack

- **Core**: React 18 + Vite
- **Styling**: Tailwind CSS (Utility-first)
- **Font**: `VT323` (Google Fonts)
- **Physics**: Custom implementation (`useDinoPhysics.js`)
  - Deterministic AABB Collision
  - Gravity/Velocity Simulation
  - Frame-independent game loop

## 📂 Project Structure

```bash
src/
├── components/
│   └── DinoLevel.js      # Level Map (JSON Config of Obstacles & Data)
├── hooks/
│   └── useDinoPhysics.js # UseState + Ref-based Physics Engine
├── data/
│   └── gameData.js       # Portfolio Content (Projects, Bio, Skills)
├── App.jsx               # Game Loop & Rendering Layer
├── main.jsx              # Entry
└── index.css             # Global Styles & 1-Bit Theme
```

## 🚀 Running Locally

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Dev Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 Aesthetic

Strict **1-Bit Color Palette**:

- Background: `#FFFFFF` (Paper White)
- Foreground: `#535353` (Grey-Black)

Designed to feel like a native browser error page turned interactive experience.

---

_Created by Gokul Kannan._
