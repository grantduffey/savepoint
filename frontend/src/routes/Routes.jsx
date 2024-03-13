import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Layout from '../pages/Layout';
import Error from '../pages/Error';
import Home from './Home';

const Routes = () => {
    const { isAuth } = useAuth();

    const publicRoutes = [
        {
            element: <Layout />,
            errorElement: <Error />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
            ],
        },
    ];

    const protectedRoutes = [
    ];

    const router = createBrowserRouter([
        ...publicRoutes,
        ...(!isAuth ? protectedRoutes : []),
        ...protectedRoutes,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;
