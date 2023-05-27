import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';
import { EditableProfileCard } from 'features/EditableProfileCard';
import cls from './ProfilePage.module.scss';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

type PropsType = {className?: string,};

const ProfilePage = memo((props: PropsType) => {
  const { className } = props;

  return (
    <Page className={classNames(cls.ProfilePage, {}, [className])}>
      <VStack gap="16" max>
        <ProfilePageHeader />
        <EditableProfileCard />
      </VStack>
    </Page>
  );
});

export default ProfilePage;
