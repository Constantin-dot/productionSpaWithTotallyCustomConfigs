import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { IStateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line constantin-dot-plugin/layer-imports-checker
import { ThemeProvider } from '@/app/providers/ThemeProvider';
// eslint-disable-next-line constantin-dot-plugin/layer-imports-checker
import '@/app/styles/index.scss';

export interface IComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<IStateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>;
  theme?: Theme;
}

interface ITestProviderProps {
  children: ReactNode;
  options?: IComponentRenderOptions;
}

export function TestProvider(props:ITestProviderProps) {
  const { children, options = {} } = props;
  const {
    route = '/',
    initialState,
    asyncReducers,
    theme = Theme.DARK,
  } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
              {children}
            </div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

export default function componentRender(
  component: ReactNode,
  options: IComponentRenderOptions = {},
) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
