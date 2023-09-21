import { lazy, Suspense, FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { WithChildren } from '../../_metronic/helpers';
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper';

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const primaryColor = getCSSVariableValue('--bs-primary');
  TopBarProgress.config({
    barColors: {
      '0': primaryColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'));
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'));
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'));
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'));
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'));
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'));
  const WorkspacesPage = lazy(() => import('../modules/apps/workspace/WorkspacePage'));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after successful login/registration */}
        <Route path="/auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/builder" element={<BuilderPageWrapper />} />
        {/* Lazy Modules */}
        <Route path="/workspaces/*" element={<SuspensedView><WorkspacesPage /></SuspensedView>} />
        <Route path="/crafted/pages/profile/*" element={<SuspensedView><ProfilePage /></SuspensedView>} />
        <Route path="/crafted/pages/wizards/*" element={<SuspensedView><WizardsPage /></SuspensedView>} />
        <Route path="/crafted/widgets/*" element={<SuspensedView><WidgetsPage /></SuspensedView>} />
        <Route path="/crafted/account/*" element={<SuspensedView><AccountPage /></SuspensedView>} />
        <Route path="/apps/chat/*" element={<SuspensedView><ChatPage /></SuspensedView>} />
        <Route path="/apps/user-management/*" element={<SuspensedView><UsersPage /></SuspensedView>} />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
