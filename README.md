# 🚀 Micro Frontend Demo

A modern micro-frontend application demonstrating Module Federation with React and Vue.js. This project showcases how different frontend frameworks can work together seamlessly using Vite and Module Federation.

## 📋 Project Structure

```
mfe/
├── host/          # Host application (React) - Port 5000
├── remote1/       # Remote 1 (React) - Port 5001
├── remote2/       # Remote 2 (Vue.js) - Port 5002
└── package.json   # Root package with scripts
```

## ✨ Features

- **Module Federation**: Dynamically load remote modules at runtime
- **Multi-Framework**: React and Vue.js working together
- **Smart UI**: Interactive landing page showing service status
- **Real-time Status**: Monitor which services are running
- **Load on Demand**: Load remote modules only when needed

## 🛠️ Tech Stack

- **Host**: React 18 + Vite
- **Remote 1**: React 18 + Vite + Module Federation
- **Remote 2**: Vue 3 + Vite + Module Federation
- **Build Tool**: Vite with @originjs/vite-plugin-federation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies for all projects:**

```bash
npm install
cd host && npm install
cd ../remote1 && npm install
cd ../remote2 && npm install
cd ..
```

Or use the convenient script:

```bash
npm run install-all
```

### Running the Application

**Option 1: Run all services together (Recommended)**

```bash
npm run dev
```

This starts all three services concurrently:
- Host: http://localhost:5000
- Remote 1: http://localhost:5001
- Remote 2: http://localhost:5002

**Option 2: Run services individually**

```bash
# Terminal 1 - Host
npm run dev:host

# Terminal 2 - Remote 1
npm run dev:remote1

# Terminal 3 - Remote 2
npm run dev:remote2
```

## 🎯 Usage

1. Open your browser and navigate to `http://localhost:5000`
2. You'll see the landing page with three service cards:
   - **Host** (always running)
   - **Remote 1** (React app)
   - **Remote 2** (Vue app)
3. Service cards show real-time status (running/stopped)
4. Click "Load" buttons to dynamically import and display remote modules
5. Interact with the loaded components:
   - **Remote 1**: Interactive counter with increment/decrement
   - **Remote 2**: Message board with add/remove functionality

## 🎨 Features by Service

### Host (Port 5000)
- Landing page dashboard
- Service status monitoring
- Dynamic module loading
- Responsive UI with gradient background

### Remote 1 - React (Port 5001)
- Interactive counter component
- State management demonstration
- Styled with blue gradient theme
- Can run standalone or be loaded into host

### Remote 2 - Vue (Port 5002)
- Message board with Vue 3 Composition API
- Real-time character/message counting
- Animated list transitions
- Styled with green gradient theme
- Can run standalone or be loaded into host

## 📦 Module Federation Configuration

Each remote exposes its main App component:

**Remote 1 (React):**
```javascript
exposes: {
  './App': './src/App'
}
```

**Remote 2 (Vue):**
```javascript
exposes: {
  './App': './src/App.vue'
}
```

**Host imports:**
```javascript
remotes: {
  remote1: 'http://localhost:5001/assets/remoteEntry.js',
  remote2: 'http://localhost:5002/assets/remoteEntry.js'
}
```

## 🔧 Development

### Adding New Remotes

1. Create a new directory for the remote
2. Set up Vite with Module Federation plugin
3. Configure the remote in `vite.config.js`
4. Add the remote to host's configuration
5. Update root `package.json` scripts

### Building for Production

```bash
# Build all services
cd host && npm run build
cd ../remote1 && npm run build
cd ../remote2 && npm run build
```

## 🎓 Learning Points

This demo demonstrates:

1. **Module Federation Basics**: Loading remote modules at runtime
2. **Cross-Framework Integration**: React and Vue working together
3. **Micro-Frontend Architecture**: Independent deployable units
4. **Shared Dependencies**: Efficient bundle sharing
5. **Dynamic Imports**: Lazy loading with React.lazy and Suspense

## 🐛 Troubleshooting

**Issue**: Remote modules fail to load
- **Solution**: Ensure all services are running on their designated ports

**Issue**: Port already in use
- **Solution**: Check and kill processes using ports 5000, 5001, or 5002

**Issue**: Module not found errors
- **Solution**: Clear node_modules and reinstall dependencies

## 📝 License

MIT

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Enjoy exploring micro-frontends!** 🎉
