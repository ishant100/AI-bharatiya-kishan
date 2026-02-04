# Quick Reference Guide

## 🚀 Essential Commands

```bash
# Installation
npm install                 # Install all dependencies

# Development
npm run dev                 # Start dev server (localhost:8080)

# Production
npm run build              # Build for production
npm run preview            # Preview production build

# Maintenance
npm update                 # Update dependencies
npm run lint              # Check code quality
```

## 📂 Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `src/main.jsx` | App entry point |
| `src/App.jsx` | Main component with routing |
| `src/index.css` | Global styles & Tailwind |
| `vite.config.js` | Vite configuration |
| `tailwind.config.js` | Tailwind theme & plugins |
| `.env` | Environment variables |

## 🧩 Component Import Patterns

```jsx
// UI Components (from shadcn/ui)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Custom Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// Pages
import Index from './pages/Index';
import Chat from './pages/Chat';

// Services
import { getAIResponse } from '@/services/ai.secure';
import { fetchForecast } from '@/services/weather';

// Hooks
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/use-toast';

// Utilities
import { cn } from '@/lib/utils';

// i18n
import { useTranslation } from 'react-i18next';
```

## 🎨 Common UI Components

```jsx
// Button
<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button size="sm">Small</Button>

// Input
<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />

// Card
<Card className="p-6">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>{/* content */}</CardContent>
  <CardFooter>{/* footer */}</CardFooter>
</Card>

// Toast
import { toast } from 'sonner';
toast.success('Success!');
toast.error('Error!');
toast.info('Info');
```

## 🌐 Translation Usage

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.description')}</p>
    </div>
  );
}
```

## 🛣️ Routing

```jsx
// Navigate programmatically
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const goToChat = () => {
    navigate('/chat');
  };
}

// Link component
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
```

## 📡 API Calls

```jsx
// Using service
import { getAIResponse } from '@/services/ai.secure';

async function askQuestion() {
  try {
    const { response } = await getAIResponse({
      type: 'text',
      content: 'What is crop rotation?'
    });
    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Using fetch directly
async function fetchData() {
  try {
    const res = await fetch('/api/endpoint');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## 🎣 Custom Hooks

```jsx
// useLocalStorage
import { useLocalStorage } from '@/hooks/useLocalStorage';

function MyComponent() {
  const [value, setValue] = useLocalStorage('key', 'default');
  
  return (
    <button onClick={() => setValue('new value')}>
      Update
    </button>
  );
}

// useToast
import { useToast } from '@/components/ui/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  const showToast = () => {
    toast({
      title: 'Success!',
      description: 'Operation completed',
    });
  };
}
```

## 🎯 State Management

```jsx
import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Runs on mount and when dependencies change
    fetchData();
  }, [/* dependencies */]);
  
  async function fetchData() {
    const result = await fetch('/api/data');
    setData(await result.json());
  }
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## 🎨 Styling Patterns

```jsx
// Using Tailwind classes
<div className="flex items-center justify-between p-4 bg-green-50">
  <h2 className="text-2xl font-bold text-green-800">Title</h2>
</div>

// Using cn() utility for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  "p-4 rounded-lg",
  isActive && "bg-green-500",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
  Content
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>
```

## 🔧 Environment Variables

```jsx
// Access in code
const apiKey = import.meta.env.VITE_DATA_GOV_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

// Add to .env file
// VITE_MY_VAR=value
```

## 📱 Page Structure Template

```jsx
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';

export default function MyPage() {
  const { t } = useTranslation('common');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <main className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <h1 className="text-3xl font-bold">{t('page.title')}</h1>
          {/* Page content */}
        </Card>
      </main>
      <Footer />
    </div>
  );
}
```

## 🐛 Debugging

```jsx
// Console logging
console.log('Value:', value);
console.error('Error:', error);
console.table(arrayOfObjects);

// React DevTools
// Install React DevTools browser extension
// Inspect component props and state

// Vite logging
// Check terminal where dev server is running
```

## 📦 Adding New Dependencies

```bash
# UI Libraries
npm install package-name

# Dev Dependencies
npm install --save-dev package-name

# Specific version
npm install package-name@1.2.3
```

## 🔥 Hot Tips

1. **Use `@/` for imports** - Configured alias for `/src`
2. **Tailwind first** - Use Tailwind classes before custom CSS
3. **Component composition** - Break large components into smaller ones
4. **Translations** - Always use `t()` for user-facing text
5. **Error boundaries** - Wrap risky components in error boundaries
6. **Lazy loading** - Use React.lazy() for code splitting
7. **Memoization** - Use useMemo/useCallback for expensive operations

## 📚 Quick Links

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Router](https://reactrouter.com)
- [i18next](https://www.i18next.com)

---

**Keep this handy for quick reference during development!** 📖
