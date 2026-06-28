import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from './contexts/LanguageContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>,
)
