import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardVariantEnum } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import cls from './NotificationItem.module.scss';
import type { INotification } from '../../model/types/notification';

type PropsType = {
  className?: string,
  item: INotification,
};

export const NotificationItem = memo((props: PropsType) => {
  const { className, item } = props;

  const content = (
    <Card
      variant={CardVariantEnum.OUTLINED}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <a target="_blank" href={item.href} className={cls.link} rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
});
