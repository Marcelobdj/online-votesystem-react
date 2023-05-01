import React from 'react';
import LoginForm from '../components/LoginForm';
import styles from './LandingPage.module.css'; // Import styles

const LandingPage = () => {
    return (
        <div className={styles.landingContainer}>
            <h1 className={styles.title}>Welcome to the Online Voting System</h1>
            <LoginForm />
        </div>
    );
};

export default LandingPage;