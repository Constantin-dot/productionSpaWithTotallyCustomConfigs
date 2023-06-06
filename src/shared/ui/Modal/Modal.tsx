import { useTheme } from 'app/providers/ThemeProvider';
import {
  FC, ReactNode,
} from 'react';
import { classNames, ModsType } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';

type PropsType = {
  className?: string,
  children?: ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  isLazy?: boolean,
};

const ANIMATION_DELAY = 300;

export const Modal: FC<PropsType> = (props) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    isLazy,
  } = props;
  const { theme } = useTheme();
  const {
    isClosing,
    isMounted,
    close,
  } = useModal({
    onClose,
    isOpen,
    animationDelay: ANIMATION_DELAY,
  });

  const mods: ModsType = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (isLazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
        <Overlay onClick={close} />
        <div
          className={cls.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
