import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { IArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlock.module.scss';

type PropsType = {
  className?: string,
  block: IArticleTextBlock,
};

export const ArticleTextBlock = memo((props: PropsType) => {
  const {
    className,
    block,
  } = props;

  return (
    <div className={classNames(cls.ArticleImageBlock, {}, [className])}>
      {block?.title && (
        <Text title={block.title} className={cls.title} />
      )}
      {block?.paragraphs.map((paragraph) => (
        <Text key={paragraph} text={paragraph} className={cls.paragraph} />
      ))}
    </div>
  );
});
