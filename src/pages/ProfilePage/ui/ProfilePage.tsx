import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import cls from './ProfilePage.module.scss';

type PropsType = {
  className?: string,
};

const ProfilePage = memo((props: PropsType) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Page className={classNames(cls.ProfilePage, {}, [className])}>
      <EditableProfileCard id={id ?? ''} />
    </Page>
  );
});

export default ProfilePage;
