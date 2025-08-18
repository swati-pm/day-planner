# 📅 Day Planner - React App

A beautiful, modern React web application built with Vite to help you plan and organize your day effectively.

## 🚀 Features

- **Task Management**: Add, edit, and delete tasks with ease
- **Time Scheduling**: Set specific times for your tasks
- **Priority Levels**: Organize tasks by High, Medium, or Low priority
- **Progress Tracking**: Mark tasks as complete and track your progress
- **Smart Filtering**: View all tasks, pending only, completed only, or filter by priority
- **Real-time Stats**: See your daily progress at a glance
- **Data Persistence**: Your tasks are automatically saved in browser storage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive React interface with smooth animations
- **Offline Support**: Service Worker enables offline functionality
- **PWA Ready**: Install as a Progressive Web App

## 🛠️ Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: CSS3 with CSS Variables
- **Icons**: Font Awesome
- **Fonts**: Inter from Google Fonts
- **Storage**: Browser LocalStorage
- **Service Worker**: For offline functionality
- **Build Tool**: Vite for fast development and optimized builds

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/day-planner.git
   cd day-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎯 How to Use

### Getting Started
1. Open the application in your web browser
2. Start adding tasks using the input field at the top

### Adding Tasks
1. Type your task in the main input field
2. Optionally set a time using the time picker
3. Choose a priority level (Low, Medium, High)
4. Click the "+" button or press Enter

### Managing Tasks
- **Complete a task**: Click the checkbox next to the task
- **Edit a task**: Click the edit icon (pencil) on any task
- **Delete a task**: Click the trash icon on any task
- **Filter tasks**: Use the filter buttons to view specific task types

### Keyboard Shortcuts
- **Enter**: Add a new task (when input is focused)
- **Escape**: Close the edit modal

### Bulk Actions
- **Clear Completed**: Remove all completed tasks
- **Clear All**: Remove all tasks (with confirmation)

## 🚀 Deployment

### Quick Deploy Commands

```bash
# Deploy to Vercel
npm run deploy:vercel

# Deploy to Netlify  
npm run deploy:netlify

# Deploy to Surge
npm run deploy:surge
```

### Platform-Specific Instructions

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `npm run deploy:vercel`
3. Follow the prompts

#### Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `npm run deploy:netlify`
3. Follow the prompts

#### GitHub Pages
1. Push your code to GitHub
2. Enable GitHub Actions in your repository
3. The workflow will automatically deploy on push to main/master

#### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider

## 📁 Project Structure

```
day-planner/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service Worker
├── src/
│   ├── components/            # React components
│   │   ├── Header.jsx
│   │   ├── TaskInput.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskStats.jsx
│   │   ├── TaskFilter.jsx
│   │   ├── EditTaskModal.jsx
│   │   └── Notification.jsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useLocalStorage.js
│   ├── App.jsx               # Main App component
│   ├── App.css               # Component styles
│   ├── index.css             # Global styles
│   └── main.jsx              # React entry point
├── .github/workflows/         # GitHub Actions
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── vercel.json               # Vercel deployment config
├── netlify.toml              # Netlify deployment config
└── README.md                 # This file
```

## 🎨 Color Scheme

The app uses a modern color palette:
- Primary: Indigo (#4f46e5)
- Secondary: Gray (#6b7280)
- Success: Green (#10b981)
- Warning: Orange (#d97706)
- Danger: Red (#dc2626)
- Background: Purple gradient (#667eea to #764ba2)

## 📱 Browser Compatibility

This day planner works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy:vercel` - Deploy to Vercel
- `npm run deploy:netlify` - Deploy to Netlify
- `npm run deploy:surge` - Deploy to Surge

### Adding New Features

1. Create new components in `src/components/`
2. Add custom hooks in `src/hooks/`
3. Update the main App component as needed
4. Add styles to the appropriate CSS files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing fast build tool
- Font Awesome for the beautiful icons
- Inter font family for the clean typography
- Unsplash for the background image

---

**Enjoy planning your day! 🌟**

Made with ❤️ and React for better productivity and organization.