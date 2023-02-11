import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ThemeSwticher.module.scss';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { Button, ThemeButtonEnum } from 'shared/ui/Button';

type PropsType = { className?: string, };

export const ThemeSwticher: FC<PropsType> = (props) => {
  const { className } = props;
  const { theme, themeToggle } = useTheme();

  return (
    <Button
      theme={ThemeButtonEnum.CLEAR}
      className={classNames(cls.ThemeSwticher, {}, [className])}
      onClick={themeToggle}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
};