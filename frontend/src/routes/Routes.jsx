import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { useAuth } from '../AuthContext';
import Home, { loader as homeLoader } from './Home';
import Layout from '../pages/Layout';
import Error from '../pages/Error'
import SearchResults from './SearchResults';
import Game, {loader as gameLoader} from './Game';
import Login from './Login';

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
                {
                    path: '/search',
                    element: <SearchResults />,
                },
                {
                    path: '/game/:id',
                    element: <Game />,
                    loader: gameLoader
                },
                {
                    path: '/login',
                    element: <Login/>,
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
