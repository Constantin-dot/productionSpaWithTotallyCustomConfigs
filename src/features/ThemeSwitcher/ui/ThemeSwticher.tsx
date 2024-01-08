import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import SwapThemeIcon from '@/shared/assets/icons/swap_theme.svg';
import { Button, ButtonVariantEnum } from '@/shared/ui/deprecated/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon as DeprecatedIcon } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
    <ToggleFeatures
      feature="isAppRedisigned"
      on={<Icon Svg={SwapThemeIcon} clickable onClick={onToggleHandler} />}
      off={
        <Button
          variant={ButtonVariantEnum.CLEAR}
          className={classNames('', {}, [className])}
          onClick={onToggleHandler}
        >
          <DeprecatedIcon Svg={ThemeIcon} width={40} height={40} inverted />
        </Button>
      }
    />
  );
});
