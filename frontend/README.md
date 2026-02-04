# Kishan AI - Smart Agriculture Assistant Frontend

A modern, multilingual agriculture assistance platform built with React, Vite, and Tailwind CSS.

## 📋 Project Overview

Kishan AI is a comprehensive agricultural assistance application that provides farmers with:
- AI-powered agricultural advice and queries
- Real-time weather forecasting
- Market price tracking
- Soil analysis
- Government scheme information
- Voice and image analysis capabilities
- Multi-language support (13+ Indian languages)

## 🚀 Features

### Core Features
- **AI Chat Interface**: Get instant answers to agricultural questions
- **Weather Forecasting**: 7-day weather predictions for your location
- **Market Prices**: Real-time commodity price tracking
- **Soil Analysis**: Soil temperature and moisture monitoring
- **Government Schemes**: Information about agricultural schemes
- **Voice Assistant**: Voice-based query interface
- **Image Analysis**: Upload and analyze farm-related images

### Technical Features
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Multilingual**: Support for 13+ Indian languages (Hindi, Bengali, Tamil, Telugu, etc.)
- **Dark Mode Ready**: Theme system with dark mode support
- **Modern UI**: Built with shadcn/ui components
- **Fast Performance**: Optimized with Vite and React
- **Type-Safe**: Clean JavaScript codebase

## 📁 Project Structure

```
kishan-ai-frontend/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images and static assets
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── WelcomeHero.jsx
│   │   ├── ContextPanel.jsx
│   │   ├── LanguageSelector.jsx
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── usePrices.js
│   │   └── use-toast.js
│   ├── i18n/             # Internationalization
│   │   ├── index.js
│   │   └── resources/    # Translation files
│   │       ├── en/
│   │       ├── hi/
│   │       └── ...
│   ├── lib/              # Utility functions
│   │   ├── utils.js
│   │   └── agmarknet.js
│   ├── pages/            # Page components
│   │   ├── Index.jsx
│   │   ├── Chat.jsx
│   │   ├── Weather.jsx
│   │   ├── Voice.jsx
│   │   ├── ImageAnalysis.jsx
│   │   └── ...
│   ├── services/         # API services
│   │   ├── ai.js
│   │   ├── weather.js
│   │   ├── markets.js
│   │   └── ...
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── components.json       # shadcn/ui configuration
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 18**: Modern UI library
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **React Router**: Client-side routing
- **TanStack Query**: Data fetching and caching
- **i18next**: Internationalization framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Steps

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
Create or edit `.env` file:
```env
VITE_DATA_GOV_API_KEY=your_api_key_here
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 🌐 Supported Languages

The application supports the following languages:
- English (en)
- Hindi (hi)
- Bengali (bn)
- Marathi (mr)
- Telugu (te)
- Tamil (ta)
- Gujarati (gu)
- Kannada (kn)
- Malayalam (ml)
- Punjabi (pa)
- Odia (or)
- Assamese (as)
- Urdu (ur)

## 🎨 UI Components

The project uses shadcn/ui components including:
- **Layout**: Card, Separator, Tabs
- **Forms**: Input, Button, Select, Checkbox, Switch
- **Feedback**: Toast, Alert, Dialog, Tooltip
- **Navigation**: Dropdown Menu, Navigation Menu
- **Data Display**: Table, Avatar, Badge
- And many more...

## 🔌 API Integration

The frontend connects to various APIs:

### Backend API
- Base URL: `/api` (proxied to `http://localhost:8787`)
- Endpoints for AI queries, user data, etc.

### External APIs
- **Weather**: Open-Meteo API for weather data
- **Market Prices**: AGMARKNET API for commodity prices
- **Geolocation**: OpenCage Geocoding API

## 📱 Pages

1. **Home (/)**: Main dashboard with quick access to all features
2. **About (/about)**: Information about the platform
3. **Chat (/chat)**: AI-powered agricultural chat interface
4. **Weather (/weather)**: Detailed weather forecasts
5. **Voice (/voice)**: Voice-based query interface
6. **Image Analysis (/image)**: Upload and analyze agricultural images
7. **Contacts (/contacts)**: Contact information

## 🎯 Key Features Implementation

### Context Panel
Allows users to:
- Select location
- Choose crop type
- Access weather forecasts
- View market prices
- Check government schemes
- View soil data

### Language Switcher
- Persistent language selection
- RTL support for Urdu
- Automatic language detection

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interfaces

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Environment Variables
Make sure to set the following environment variables in production:
- `VITE_DATA_GOV_API_KEY`: API key for government data services

## 🐛 Troubleshooting

### Common Issues

**Issue**: Module not found errors
**Solution**: Run `npm install` to ensure all dependencies are installed

**Issue**: Build fails
**Solution**: Clear the cache with `rm -rf node_modules dist .vite` and reinstall

**Issue**: Port already in use
**Solution**: Change the port in `vite.config.js` or kill the process using port 8080

## 📄 License

This project is part of the Kishan AI agricultural assistance platform.

## 🤝 Contributing

This is a rebuilt version of the original project. All functionality has been preserved and errors have been fixed.

## 📞 Support

For issues or questions about the application, please refer to the Contacts page within the app.

---

**Note**: This is a clean rebuild of the original TypeScript project, converted to pure JavaScript with all errors fixed and dependencies properly configured.
