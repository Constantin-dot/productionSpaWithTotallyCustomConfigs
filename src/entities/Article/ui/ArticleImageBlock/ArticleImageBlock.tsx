import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlignEnum } from '@/shared/ui/deprecated/Text';
import { IArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlock.module.scss';

type PropsType = {
  className?: string;
  block: IArticleImageBlock;
};

export const ArticleImageBlock = memo((props: PropsType) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.ArticleImageBlock, {}, [className])}>
      <img src={block.src} className={cls.img} alt={block.title} />
      {block.title && <Text text={block.title} align={TextAlignEnum.CENTER} />}
    </div>
  );
});
