import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav.jsx'
const Layout = () => (
    <>
        <Nav/>
        <Outlet />
    </>
);

export default Layout;
