import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import VoteForm from '../components/VoteForm';
import api from '../config/api';
import AuthContext from '../contexts/AuthContext';
import Navbar from '../components/common/Navbar'; // Import Navbar
import Footer from '../components/common/Footer'; // Import Footer
import styles from './VotePage.module.css'; // Import styles

const VotePage = () => {
    const [category, setCategory] = useState(null);
    const [alertMessage, setAlertMessage] = useState(''); // Add this line for alert message
    const { user, setUser } = useContext(AuthContext); // Add setUser here
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/');
        }
    }, [setUser, navigate]);

    const fetchCategory = async () => {
        try {
            const response = await api.get('/categories/latest');
            setCategory(response.data);
        } catch (error) {
            console.error('Error fetching latest category:', error);
        }
    };

    const handleVoteSubmit = async (voteOption) => {
        try {
            const response = await api.post(
                `/categories/${category._id}/vote`,
                { userId: user._id, option: voteOption },
                { headers: { 'x-auth-token': user.token } }
            );
            console.log(response.data.message);
            console.log("Submitting vote for user:", user._id);

            setAlertMessage('Vote submitted successfully.'); // Add this line for successful vote message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds

            fetchCategory();
        } catch (error) {
            console.error('Error submitting vote:', error);

            setAlertMessage('Error submitting vote. Please try again.'); // Add this line for error message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds
        }
    };

    useEffect(() => {
        if (user) {
            console.log("Current user ID:", user._id);
        }
    }, [user]);

    useEffect(() => {
        fetchCategory();
    }, []);

    if (!category) {
        return <div><Navbar />No categories available<Footer /></div>;
    }

    return (
        <div className={styles.container}>
            <Navbar />
            <h1>Vote for the Category</h1>
            {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
            <CategoryCard categoryName={category.name} voteOptions={category.options} />
            <VoteForm voteOptions={category.options} onVoteSubmit={handleVoteSubmit} />
            <Footer />
        </div>
    );
};

export default VotePage;