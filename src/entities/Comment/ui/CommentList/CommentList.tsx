import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { IComment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

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
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames('', {}, [className])}>
      {
        comments?.length
          ? comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isLoading={isLoading}
            />
          ))
          : <Text text={t('hasNotComments')} />
      }
    </VStack>
  );
};
