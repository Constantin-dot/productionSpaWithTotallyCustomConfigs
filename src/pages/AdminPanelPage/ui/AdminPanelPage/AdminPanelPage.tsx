import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
  const { className } = props;

  return (
    <Page
      className={classNames(cls.AdminPanelPage, {}, [className])}
      data-testid="AdminPanelPage"
    >
      adminka
    </Page>
  );
});

export default AdminPanelPage;
