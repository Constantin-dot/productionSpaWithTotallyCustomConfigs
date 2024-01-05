import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button, ButtonVariantEnum } from '@/shared/ui/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

type PropsType = { className?: string };

export const ThemeSwticher = memo((props: PropsType) => {
  const { className } = props;
  const { theme, themeToggle } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    themeToggle((theme: Theme) => {
      dispatch(saveJsonSettings({ theme }));
    });
  }, [dispatch, themeToggle]);

  return (
    <Button
      variant={ButtonVariantEnum.CLEAR}
      className={classNames('', {}, [className])}
      onClick={onToggleHandler}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
