import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import cls from './NotificationList.module.scss';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

type PropsType = {
  className?: string;
  isInvertedItemColor?: boolean;
};

export const NotificationList = memo((props: PropsType) => {
  const { className, isInvertedItemColor } = props;
  const { data, isLoading } = useNotifications(null, { pollingInterval: 5000 });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationItem
          key={item.id}
          item={item}
          isInvertedItemColor={isInvertedItemColor}
        />
      ))}
    </VStack>
  );
});
