import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover } from '@/shared/ui/Popups';
import { Button, ButtonVariantEnum } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/bell.svg';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import cls from './NotificationButton.module.scss';

type PropsType = {
  className?: string,
};

export const NotificationButton = memo((props: PropsType) => {
  const { className } = props;

  const [isDOpen, setIsDOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsDOpen(true);
  }, []);
  const onCloseDrawer = useCallback(() => {
    setIsDOpen(false);
  }, []);

  const trigger = (
    <Button variant={ButtonVariantEnum.CLEAR} onClick={onOpenDrawer}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          trigger={trigger}
          direction="bottomLeft"
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isDOpen} onClose={onCloseDrawer}>
          <NotificationList isInvertedItemColor />
        </Drawer>
      </MobileView>
    </div>
  );
});
