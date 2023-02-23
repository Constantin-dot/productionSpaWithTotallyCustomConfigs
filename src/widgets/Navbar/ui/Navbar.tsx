import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSizeEnum, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './Navbar.module.scss';

interface INavbarProps {
  className?: string;
}

export const Navbar: FC<INavbarProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModalOpen((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>

      <Button
        variant={ButtonVariantEnum.CLEAR_INVERTED}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t('signIn')}
      </Button>
      <Modal isOpen={isAuthModalOpen} onClose={onToggleModal}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis nesciunt
        modi sit libero accusantium dolore tempore voluptas rerum totam reprehenderit
        quo ad magnam nobis officiis harum obcaecati aut suscipit accusamus ipsa
        corporis consequatur, illum, distinctio nisi. Quod assumenda nesciunt
        temporibus a dolorem quis laudantium inventore sunt magni. Placeat, debitis temporibus.
      </Modal>
    </div>
  );
};
