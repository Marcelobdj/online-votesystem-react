import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import api from '../config/api';
import styles from './LoginForm.module.css'; // Import styles

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(''); // Add this line for alert message
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {
                username,
                password,
            });

            const user = response.data;

            setUser(null);
            localStorage.removeItem('user');

            setUser(user);
            localStorage.setItem('user', JSON.stringify(user)); // Store user data in local storage

            setAlertMessage('Login successful.'); // Add this line for successful login message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds

            if (user.isMaster) {
                navigate('/master');
            } else {
                navigate('/vote');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            setAlertMessage('Error during authentication. Please check your username and password.'); // Add this line for error message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds
        }
    };

    return (
        <form onSubmit={handleLogin} className={styles.formContainer}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Login</button>
          {alertMessage && (
            <div className={`${styles.alert} ${alertMessage.startsWith('Error') ? styles.alertError : styles.alertSuccess}`}>
              {alertMessage}
            </div>
          )}
        </form>
      );
    };
    
    export default LoginForm;