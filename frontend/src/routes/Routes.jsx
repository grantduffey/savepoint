import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { useAuth } from '../AuthContext';
import Home, { loader as homeLoader } from './Home';
import Layout from '../pages/Layout';
import Error from '../pages/Error'

const Routes = () => {
    // const { isAuth } = useAuth();

    const publicRoutes = [
        {
            element: <Layout />,
            errorElement: <Error/>,
            children: [
                {
                    path: '/',
                    element: <Home />,
                    loader: homeLoader
                },
            ],
        },
    ];

    // const protectedRoutes = [
    //     {
    //         element: <ProtectedRouteLayout />,
    //         children: [
    //             {
    //                 path: '/protected',
    //                 element: <Protected />,
    //             }
    //         ],
    //     },
    // ];

    const router = createBrowserRouter([
        ...publicRoutes,
        // ...(!isAuth ? protectedRoutes : []),
        // ...protectedRoutes,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;
