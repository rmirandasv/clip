# 📝 Clip - Markdown Notes Desktop App

[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://github.com/yourusername/clip)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Desktop-blue.svg)](https://nativephp.com)

> A beautiful, offline-first desktop application for managing your markdown notes with a modern interface and integrated editor.

## ✨ Features

- **📁 Directory Management** - Create and organize your notes in folders
- **📄 Markdown Editor** - Integrated markdown editor with live preview
- **💾 Offline-First** - Works completely offline, no internet required
- **🔍 File System Integration** - Files are stored directly on your filesystem
- **🔄 Sync Ready** - Easy integration with Google Drive, Git, or any cloud service
- **🎨 Modern UI** - Beautiful, responsive interface built with React and Tailwind CSS
- **⚡ Native Performance** - Built with NativePHP for optimal desktop experience

<img width="1920" height="969" alt="image" src="https://github.com/user-attachments/assets/085c13d0-c7c2-4722-939c-cefeee3740cc" />

## 🚀 Quick Start

### Prerequisites

- PHP 8.2 or higher
- Node.js 18 or higher
- Composer
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/clip.git
   cd clip
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   php artisan native:serve
   
   # Or use the combined command
   composer run native:dev
   ```

## 🛠️ Technology Stack

- **Backend**: Laravel 12 + NativePHP
- **Frontend**: React 19 + TypeScript
- **UI Framework**: Tailwind CSS + Radix UI
- **Markdown Editor**: React MD Editor
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

## 📁 Project Structure

```
clip/
├── app/                    # Laravel application logic
│   ├── Actions/           # Business logic actions
│   ├── Http/              # Controllers, middleware, requests
│   ├── Models/            # Eloquent models
│   └── Providers/         # Service providers
├── resources/
│   └── js/               # React frontend
│       ├── components/    # Reusable UI components
│       ├── pages/         # Application pages
│       ├── layouts/       # Page layouts
│       └── hooks/         # Custom React hooks
├── routes/                # Application routes
└── database/              # Migrations and seeders
```

## 🎯 Key Features Explained

### Offline-First Architecture
Clip is designed to work completely offline. All your markdown files are stored directly on your local filesystem, making them:
- **Accessible** - Open files with any text editor
- **Backupable** - Easy to backup with any tool
- **Syncable** - Perfect for Git repositories or cloud sync services

### File System Integration
- Files are created in real directories on your system
- Clear folder structure that you can navigate in your file explorer
- No proprietary database - your files are your data

### Modern Development Stack
- **NativePHP**: Cross-platform desktop application framework
- **Laravel**: Robust backend with elegant syntax
- **React**: Modern, component-based frontend
- **TypeScript**: Type-safe development experience

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev                    # Start Vite dev server
php artisan native:serve       # Start NativePHP app
composer run native:dev        # Run both simultaneously

# Building
npm run build                  # Build for production
npm run build:ssr             # Build with SSR

# Code Quality
npm run lint                   # ESLint
npm run format                 # Prettier formatting
npm run types                  # TypeScript type checking
```

### Development Workflow

1. Start the development server: `composer run native:dev`
2. Make changes to your React components in `resources/js/`
3. Modify Laravel controllers and models in `app/`
4. The app will automatically reload with your changes

## 📦 Building for Distribution

```bash
# Build the desktop application
php artisan native:build

# The built application will be in the build/ directory
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NativePHP](https://nativephp.com) - For the amazing desktop framework
- [Laravel](https://laravel.com) - The elegant PHP framework
- [React](https://reactjs.org) - The library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/rmirandasv/clip/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rmirandasv/clip/discussions)
- **Documentation**: [NativePHP Docs](https://nativephp.com/docs)

---

**Made with ❤️ using NativePHP and Laravel**
