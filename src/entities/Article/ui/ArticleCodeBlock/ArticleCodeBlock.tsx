import { IArticleCodeBlock } from 'entities/Article/model/types/article';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Code } from 'shared/ui/Code/Code';

type PropsType = {
  className?: string,
  block: IArticleCodeBlock,
};

export const ArticleCodeBlock = memo((props: PropsType) => {
  const {
    className,
    block,
  } = props;

  return (
    <div className={classNames('', {}, [className])}>
      <Code text={block.code} />
    </div>
  );
});
