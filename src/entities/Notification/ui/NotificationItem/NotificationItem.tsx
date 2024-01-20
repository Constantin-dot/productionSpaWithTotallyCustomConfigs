import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  CardVariantEnum,
  Card as DeprecatedCard,
} from '@/shared/ui/deprecated/Card';
import {
  Text as DeprecatedText,
  TextVariantEnum,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './NotificationItem.module.scss';
import type { INotification } from '../../model/types/notification';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

type PropsType = {
  className?: string;
  item: INotification;
  isInvertedItemColor?: boolean;
};

export const NotificationItem = memo((props: PropsType) => {
  const { className, item, isInvertedItemColor } = props;

  const content = (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
          <Text title={item.title} text={item.description} />
        </Card>
      }
      off={
        <DeprecatedCard
          variant={CardVariantEnum.OUTLINED}
          className={classNames(cls.NotificationItem, {}, [className])}
        >
          <DeprecatedText
            title={item.title}
            text={item.description}
            variant={isInvertedItemColor ? TextVariantEnum.INVERTED : undefined}
          />
        </DeprecatedCard>
      }
    />
  );

  if (item.href) {
    return (
      <a
        target="_blank"
        href={item.href}
        className={classNames(
          cls.link,
          { [cls.inverted]: isInvertedItemColor },
          [],
        )}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
});
