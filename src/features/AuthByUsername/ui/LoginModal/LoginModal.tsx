import { FC, Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

type PropsType = {
  className?: string,
  isOpen: boolean,
  onClose: () => void,
};

export const LoginModal: FC<PropsType> = (props) => {
  const {
    className,
    isOpen,
    onClose,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={classNames('', {}, [className])}
      isLazy
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync
          onSuccessHandler={onClose}
        />
      </Suspense>
    </Modal>
  );
};
