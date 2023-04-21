import { IArticleImageBlock } from 'entities/Article/model/types/article';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlignEnum } from 'shared/ui/Text/Text';
import cls from './ArticleImageBlock.module.scss';

type PropsType = {
  className?: string,
  block: IArticleImageBlock,
};

export const ArticleImageBlock = memo((props: PropsType) => {
  const {
    className,
    block,
  } = props;

  return (
    <div className={classNames(cls.ArticleImageBlock, {}, [className])}>
      <img src={block.src} className={cls.img} alt={block.title} />
      {block.title && (
        <Text text={block.title} align={TextAlignEnum.CENTER} />
      )}
    </div>
  );
});