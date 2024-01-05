import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { useJsonSettings } from '@/entities/User';

interface IThemeProviderProps {
  initialTheme: Theme;
  children: ReactNode;
}

export const ThemeProvider = (props: IThemeProviderProps) => {
  const { initialTheme, children } = props;
  const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();

  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    setTheme(defaultTheme);
  }, [defaultTheme]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
