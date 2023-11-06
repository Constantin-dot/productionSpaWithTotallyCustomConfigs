import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './ArticleEditPage.module.scss';

type PropsType = { className?: string };

const ArticleEditPage: FC<PropsType> = (props) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit ? `Редактирование статьи с id = ${id}` : 'Creating article'}
    </Page>
  );
};

export default ArticleEditPage;
