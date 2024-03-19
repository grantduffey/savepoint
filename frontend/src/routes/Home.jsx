// import { useAuth } from '../AuthContext';
// import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';

import '../global.css'


const Home = () => {
    // const { isAuth } = useAuth();
    return (
        <Wrapper>
            <h1>Home</h1>
            <p>Test</p>
            <button className="btn">Hello daisyUI</button>

        
        </Wrapper>
    );
};

export default Home;
