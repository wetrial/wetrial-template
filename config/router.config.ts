export default [
    {
        path: '/',
        component: '../layouts/BasicLayout',
        // Routes: ['src/pages/Authorized'],
        routes: [
            // dashboard
            { path: '/', redirect: '/dashboard/analysis' },
            {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'dashboard',
                routes: [
                    {
                        path: '/dashboard/analysis',
                        name: 'analysis',
                        component: './index',
                    }
                ],
            },
            {
                component: '404',
            },
        ],
    },
];  