import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { IComment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';

type PropsType = {
  className?: string;
  comment?: IComment;
  isLoading?: boolean;
};

export const CommentCard: FC<PropsType> = (props) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack
        gap="8"
        align="start"
        max
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
        data-testid="CommentCard.Loading"
      >
        <div className={cls.header}>
          <Skeleton
            width={30}
            height={30}
            border="50%"
            className={cls.avatar}
          />
          <Skeleton width={100} height={16} />
        </div>
        <Skeleton width="100%" height={50} className={cls.text} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack
      gap="8"
      align="start"
      max
      className={classNames(cls.CommentCard, {}, [className])}
    >
      <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
        {comment.user?.avatar && (
          <Avatar
            size={30}
            src={comment.user.avatar}
            alt="user avatar"
            className={cls.avatar}
          />
        )}
        <Text title={comment.user.username} />
      </AppLink>
      <Text text={comment.text} className={cls.text} />
    </VStack>
  );
};
