# 🎧 Premium Headset Scrollytelling Experience

An immersive, award-winning level product landing page built to showcase the **Sony WH-1000XM6** headset. This application features high-end scroll-driven animations, an interactive soundstage audio simulator, and an optimized pre-order acquisition funnel.

## ✨ Features

- **Awwwards-Level Scrollytelling:** Immersive cinematic animations triggered dynamically by user scroll position.
- **Soundstage Simulator:** Interactive audio processing preview component allowing users to test active noise cancellation (ANC) and sound profiles directly in-browser.
- **Dynamic 3D-Like Presentation:** Smooth, interactive visual sequencing tracking premium hardware aesthetics.
- **Modern Layout Architecture:** Built using structured layout trees, including sticky navigation trackers, a global custom footer (`Footer.jsx`), and interactive modular overlays.

## 🚀 Tech Stack

- **Frontend Framework:** React (JSX)
- **Build Tool:** Vite
- **Styling:** CSS-in-JS Flexbox/Grid structures
- **Icons:** Lucide React (`lucide-react`)

## 🛠️ Getting Started

Follow these steps to get your local development environment up and running:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your machine.

### 2. Installation
Clone the repository and install the project dependencies:
```bash
# Clone the repository
git clone https://github.com

# Navigate into the project directory
cd headset_web

# Install required node modules
npm install
```

### 3. Development Server
Launch the local dev environment:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173/`** to view the live scrollytelling application.

### 4. Production Build
To create an optimized production build, run:
```bash
npm run build
```
The compiled, deployment-ready assets will be generated in the `/dist` folder.

## 📁 Project Structure

```text
headset_web/
├── dist/                  # Compiled production files (ignored by Git)
├── node_modules/          # Project dependencies (ignored by Git)
├── public/                # Static public assets (images, fonts)
├── src/
│   ├── components/        # Reusable UI layout elements
│   │   └── Footer.jsx     # Global branding & navigation footer
│   ├── App.jsx            # Main app assembly and scrolling sequence
│   ├── main.jsx           # Application entry point
│   └── vite.config.js     # Development environment configurations
├── index.html             # Main document root
├── package.json           # Scripts and dependency mappings
└── .gitignore             # Environment and tracking exclusion file
```

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
