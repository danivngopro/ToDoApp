import './Navbar.css';
import CustomLink from './CustomLink';
import { Link } from 'react-router-dom';
// import { auth } from '../firebase/base';

function Navbar() {
    return (
        <nav className='nav'>
            <Link to='/' className='site-title'>ToDo</Link>
            <ul>
                <CustomLink to='/login'>Log In</CustomLink>
                <CustomLink to='/signup'>Sign Up</CustomLink>
                <CustomLink to='/about'>About</CustomLink>
                {/* <button onClick={() => { auth.si }}>Sign Out</button> */}
            </ul>
        </nav>
    );
}

export default Navbar;