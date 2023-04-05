import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
const PostManagementPage = Loadable(lazy(() => import('app/views/PostManagement/index')));
const SettingPage = Loadable(lazy(() => import('app/views/setting/Setting')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: 'xipat-testings/dashboard/subscription',
        element: <Analytics chart={'subscription'} />,
        auth: authRoles.admin
      },
      {
        path: 'xipat-testings/dashboard/revenue',
        element: <Analytics chart={'revenue'} />,
        auth: authRoles.admin
      },
      {
        path: 'xipat-testings/post-management',
        element: <PostManagementPage />,
        auth: authRoles.admin
      },
      {
        path: 'xipat-testings/Setting',
        element: <SettingPage />,
        auth: authRoles.admin
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="xipat-testings/dashboard/subscription" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
