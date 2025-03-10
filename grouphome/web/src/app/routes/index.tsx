import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import { AppRoot } from './app/root';

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LoginRoute } = await import('./auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/app',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { DashboardRoute } = await import('./app/dashboard');
            return { Component: DashboardRoute };
          },
        },
      ],
    },
    {
      path: '/app/office',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { OfficeRoute } = await import('./app/office-management/OfficeRoute');
            return { Component: OfficeRoute };
          },
        },
      ],
    },
    {
      path: '/app/home',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { HomeRoute } = await import('./app/office-management/HomeRoute');
            return { Component: HomeRoute };
          },
        },
      ],
    },
    {
      path: '/app/staff',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { StaffRoute } = await import('./app/office-management/StaffRoute');
            return { Component: StaffRoute };
          },
        },
      ],
    },
    {
      path: '/app/docManage',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { DocManageRoute } = await import('./app/office-management/DocManageRoute');
            return { Component: DocManageRoute };
          },
        },
      ],
    },
    {
      path: '/app/inquiry',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { InquiryRoute } = await import('./app/customer-management/InquiryRoute');
            return { Component: InquiryRoute };
          },
        },
      ],
    },
    {
      path: '/app/request',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { RequestRoute } = await import('./app/customer-management/RequestRoute');
            return { Component: RequestRoute };
          },
        },
      ],
    },
    {
      path: '/app/tenant',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { TenantRoute } = await import('./app/customer-management/TenantRoute');
            return { Component: TenantRoute };
          },
        },
      ],
    },
    {
      path: '/app/facility/daily',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { DailyRoute } = await import('./app/facility-management/DailyRoute');
            return { Component: DailyRoute };
          },
        },
      ],
    },
    {
      path: '/app/facility/daily-detail',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { DailyDetailRoute } = await import('./app/facility-management/DailyDetailRoute');
            return { Component: DailyDetailRoute };
          },
        },
      ],
    },
    {
      path: '/app/facility/daily-recorder',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { DailyRecorderRoute } = await import('./app/facility-management/DailyRecorderRoute');
            return { Component: DailyRecorderRoute };
          },
        },
      ],
    },
    {
      path: '/app/facility/daily-user-specific',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { UserSpecificRoute } = await import('./app/facility-management/UserSpecificRoute');
            return { Component: UserSpecificRoute };
          },
        },
      ],
    },
    {
      path: '/app/support-plan',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { SupportPlanRoute } = await import('./app/customer-management/SupportPlanRoute');
            return { Component: SupportPlanRoute };
          },
        },
      ],
    },
    {
      path: '/app/under-preparation',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { UnderPreparationRoute } = await import('./app/UnderPreparationRoute');
            return { Component: UnderPreparationRoute };
          },
        },
      ],
    },
    {
      path: '/app/employee',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { EmployeeRoute } = await import('./app/employee-management/EmployeeRoute');
            return { Component: EmployeeRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);
