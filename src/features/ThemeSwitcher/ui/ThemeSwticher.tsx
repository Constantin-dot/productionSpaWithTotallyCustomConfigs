import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Button, ButtonVariantEnum } from '@/shared/ui/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon } from '@/shared/ui/Icon';

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
      <Icon Svg={ThemeIcon} width={40} height={40} inverted />
    </Button>
  );
});
