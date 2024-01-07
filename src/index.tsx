import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { App } from './app/App';
import '@/shared/config/i18n/i18n';
import '@/app/styles/index.scss';
import { Theme } from './shared/const/theme';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container didn't find");
}

const root = createRoot(container);
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider initialTheme={Theme.LIGHT}>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
);
