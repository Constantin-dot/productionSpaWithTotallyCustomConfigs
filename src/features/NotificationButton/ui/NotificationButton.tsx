import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover as DeprecatedPopover } from '@/shared/ui/deprecated/Popups';
import {
  Button as DeprecatedBtn,
  ButtonVariantEnum,
} from '@/shared/ui/deprecated/Button';
import { Icon as DeprecatedIcn } from '@/shared/ui/deprecated/Icon';
import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/bell.svg';
import NotificationIcon from '@/shared/assets/icons/notify.svg';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import cls from './NotificationButton.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

type PropsType = {
  className?: string;
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
    <ToggleFeatures
      feature="isAppRedisigned"
      on={<Icon Svg={NotificationIcon} onClick={onOpenDrawer} clickable />}
      off={
        <DeprecatedBtn variant={ButtonVariantEnum.CLEAR} onClick={onOpenDrawer}>
          <DeprecatedIcn Svg={NotificationIconDeprecated} inverted />
        </DeprecatedBtn>
      }
    />
  );

  return (
    <div>
      <BrowserView>
        <ToggleFeatures
          feature="isAppRedisigned"
          on={
            <Popover
              className={classNames(cls.NotificationButton, {}, [className])}
              trigger={trigger}
              direction="bottomLeft"
            >
              <NotificationList className={cls.notifications} />
            </Popover>
          }
          off={
            <DeprecatedPopover
              className={classNames(cls.NotificationButton, {}, [className])}
              trigger={trigger}
              direction="bottomLeft"
            >
              <NotificationList className={cls.notifications} />
            </DeprecatedPopover>
          }
        />
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
