import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { IComment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

type PropsType = {
  className?: string,
  comments?: Array<IComment>,
  isLoading?: boolean,
};

export const CommentList: FC<PropsType> = (props) => {
  const {
    className,
    comments,
    isLoading,
  } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {
        comments?.length
          ? comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              className={cls.comment}
              isLoading={isLoading}
            />
          ))
          : <Text text={t('hasNotComments')} />
      }
    </div>
  );
};
