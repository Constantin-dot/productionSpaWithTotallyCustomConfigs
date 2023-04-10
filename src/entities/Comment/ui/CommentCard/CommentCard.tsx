import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';
import { IComment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

type PropsType = {
  className?: string,
  comment: IComment,
  isLoading?: boolean,
};

export const CommentCard: FC<PropsType> = (props) => {
  const {
    className,
    comment,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" className={cls.avatar} />
          <Skeleton width={100} height={16} />
        </div>
        <Skeleton width="100%" height={50} className={cls.text} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {comment.user?.avatar && (
          <Avatar
            size={30}
            src={comment.user.avatar}
            alt="user avatar"
            className={cls.avatar}
          />
        )}
        <Text title={comment.user.username} />
      </div>
      <Text text={comment.text} className={cls.text} />
    </div>
  );
};
