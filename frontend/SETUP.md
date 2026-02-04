# Setup Guide - Kishan AI Frontend

## Quick Start

Follow these steps to get the Kishan AI frontend up and running:

### 1. Prerequisites Check

Ensure you have the following installed:
```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### 2. Project Setup

```bash
# Navigate to project directory
cd kishan-ai-frontend

# Install all dependencies
npm install

# This will install:
# - React and React DOM
# - Vite build tool
# - Tailwind CSS and plugins
# - UI component libraries
# - Routing and state management
# - i18n for translations
# - And all other dependencies
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example
cp .env.example .env

# Or create manually
touch .env
```

Add the following content to `.env`:
```env
# Data.gov.in API Key for market prices
VITE_DATA_GOV_API_KEY=your_api_key_here

# Optional: Backend API URL (default: http://localhost:8787)
# VITE_API_URL=http://your-backend-url
```

**Getting API Keys:**
- **Data.gov.in API**: Visit [data.gov.in](https://data.gov.in) and register for an API key
- This key is used for fetching market prices from AGMARKNET

### 4. Start Development Server

```bash
npm run dev
```

The application will start at: `http://localhost:8080`

### 5. Verify Installation

Open your browser and navigate to `http://localhost:8080`

You should see:
- ✅ The Kishan AI homepage
- ✅ Header with navigation
- ✅ Language selector
- ✅ Welcome hero section
- ✅ Context panel on the left
- ✅ Query interface

## Building for Production

### Create Production Build

```bash
npm run build
```

This will:
1. Optimize all assets
2. Minify JavaScript and CSS
3. Generate source maps
4. Output to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

Test the production build locally at `http://localhost:4173`

### Deploy Production Build

The `dist/` folder contains all static files ready for deployment. You can deploy to:

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Traditional Server
Simply copy the `dist/` folder contents to your web server's public directory.

## Project Structure Explained

```
kishan-ai-frontend/
│
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   │   ├── Header.jsx      # App header with navigation
│   │   ├── Footer.jsx      # App footer
│   │   └── ...             # Other custom components
│   │
│   ├── pages/              # Page-level components (routes)
│   │   ├── Index.jsx       # Home page
│   │   ├── Chat.jsx        # AI chat page
│   │   ├── Weather.jsx     # Weather forecast page
│   │   └── ...             # Other pages
│   │
│   ├── services/           # API integration logic
│   │   ├── ai.js           # AI service calls
│   │   ├── weather.js      # Weather API calls
│   │   └── ...             # Other services
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   └── ...
│   │
│   ├── i18n/               # Internationalization
│   │   ├── index.js        # i18n configuration
│   │   └── resources/      # Translation files for each language
│   │
│   ├── lib/                # Utility functions
│   │   └── utils.js        # Helper functions
│   │
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles and Tailwind directives
│
├── public/                  # Static assets
│   ├── placeholder.svg
│   └── robots.txt
│
├── Configuration Files
├── .env                    # Environment variables (create this)
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── components.json         # shadcn/ui configuration
└── package.json            # Dependencies and scripts
```

## Development Workflow

### Adding a New Page

1. Create page component in `src/pages/`:
```jsx
// src/pages/MyNewPage.jsx
export default function MyNewPage() {
  return <div>My New Page</div>;
}
```

2. Add route in `src/App.jsx`:
```jsx
import MyNewPage from './pages/MyNewPage';

// In Routes component
<Route path="/my-page" element={<MyNewPage />} />
```

### Adding a New Component

1. Create component in `src/components/`:
```jsx
// src/components/MyComponent.jsx
export function MyComponent({ prop1, prop2 }) {
  return <div>{/* component content */}</div>;
}
```

2. Import and use:
```jsx
import { MyComponent } from '@/components/MyComponent';
```

### Adding Translations

1. Add text to all language files in `src/i18n/resources/`:
```json
// src/i18n/resources/en/common.json
{
  "myKey": "My translated text"
}
```

2. Use in components:
```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  return <div>{t('myKey')}</div>;
}
```

### Adding a New Service

1. Create service in `src/services/`:
```javascript
// src/services/myservice.js
export async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}
```

2. Use in components:
```jsx
import { fetchData } from '@/services/myservice';
```

## Common Tasks

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages (careful!)
npm update

# Update specific package
npm update package-name
```

### Cleaning Build Cache

```bash
# Remove build artifacts
rm -rf dist

# Remove dependencies and cache
rm -rf node_modules .vite

# Reinstall everything
npm install
```

### Adding UI Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
```

## Troubleshooting

### Port 8080 Already in Use

Change the port in `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000, // Change to desired port
  },
});
```

### Module Not Found Errors

```bash
# Clear everything and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Vite cache
rm -rf .vite

# Try building again
npm run build
```

### Styles Not Updating

```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev
```

## Environment-Specific Configuration

### Development
- Hot module replacement enabled
- Source maps included
- API proxy to localhost:8787

### Production
- Code minified and optimized
- Source maps generated separately
- Environment variables from `.env` baked into build

## Next Steps

1. ✅ Complete installation
2. ✅ Configure environment variables
3. ✅ Start development server
4. 🔄 Customize for your needs
5. 🚀 Build and deploy

## Need Help?

- Check the main README.md for detailed documentation
- Review the code examples in the components
- Check the console for error messages
- Ensure all environment variables are set correctly

---

**Happy Coding! 🌾**
