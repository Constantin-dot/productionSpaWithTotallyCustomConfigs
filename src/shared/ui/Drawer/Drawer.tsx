import { ReactNode, memo } from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

type PropsType = {
  className?: string,
  children: ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  lazy?: boolean,
};

export const Drawer = memo((props: PropsType) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    lazy,
  } = props;
  const { theme } = useTheme();
  const {
    isClosing,
    isMounted,
    close,
  } = useModal({
    onClose,
    isOpen,
    animationDelay: 300,
  });

  const mods: ModsType = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className, theme, 'app-drawer'])}>
        <Overlay onClick={close} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
});
