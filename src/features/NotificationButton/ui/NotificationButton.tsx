import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationList } from 'entities/Notification';
import NotificationIcon from 'shared/assets/icons/bell.svg';
import cls from './NotificationButton.module.scss';

type PropsType = {
  className?: string,
};

export const NotificationButton = memo((props: PropsType) => {
  const { className } = props;

  return (
    <Popover
      className={classNames(cls.NotificationButton, {}, [className])}
      trigger={(
        <Button variant={ButtonVariantEnum.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      )}
      direction="bottomLeft"
    >
      <NotificationList className={cls.notifications} />
    </Popover>
  );
});
