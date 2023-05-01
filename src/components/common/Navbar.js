import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.greeting}>Welcome, {user?.username}</div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Navbar;