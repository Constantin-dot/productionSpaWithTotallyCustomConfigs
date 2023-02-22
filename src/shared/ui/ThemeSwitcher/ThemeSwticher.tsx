import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';

type PropsType = { className?: string, };

export const ThemeSwticher: FC<PropsType> = (props) => {
  const { className } = props;
  const { theme, themeToggle } = useTheme();

  return (
    <Button
      variant={ButtonVariantEnum.CLEAR}
      className={classNames('', {}, [className])}
      onClick={themeToggle}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
};
