import React, { useState, useEffect, useContext } from 'react'; // Add useContext import
import { useNavigate } from 'react-router-dom';
import CategoryForm from '../components/CategoryForm';
import CategoryCard from '../components/CategoryCard';
import api from '../config/api';
import AuthContext from '../contexts/AuthContext'; // Import AuthContext
import Navbar from '../components/common/Navbar'; // Import Navbar
import Footer from '../components/common/Footer'; // Import Footer
import styles from './MasterPage.module.css'; // Import styles

const MasterPage = () => {
    const [categories, setCategories] = useState([]);
    const [isVotingOpen, setIsVotingOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(''); // Add this line for alert message
    const { user, setUser } = useContext(AuthContext); // Add setUser to the destructuring assignment
    const navigate = useNavigate();
    console.log('User object:', user); // Add this line

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                console.log('Fetched categories:', response.data); // Add this line
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            const lastCategory = categories[categories.length - 1];
            setIsVotingOpen(!lastCategory.isClosed);
        } else {
            setIsVotingOpen(false);
        }
    }, [categories]);

    const handleCategoryCreation = async (category) => {
        try {
            const response = await api.post('/categories', category);
            const newCategory = response.data;
            setCategories([...categories, newCategory]);

            setAlertMessage('Category created successfully.'); // Add this line for successful creation message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds
        } catch (error) {
            console.error('Error during category creation:', error);

            setAlertMessage('Error creating category. Please try again.'); // Add this line for error message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds
        }
    };

    const handleCategoryDeletion = async (categoryId) => {
        try {
            await api.delete(`/categories/${categoryId}`);
            setCategories(categories.filter((category) => category._id !== categoryId));

            setAlertMessage('Category deleted successfully.'); // Add this line for successful deletion message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds
        } catch (error) {
            console.error('Error during category deletion:', error);

            setAlertMessage('Error deleting category. Please try again.'); // Add this line for error message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds
        }
    };

    const handleVoteClosure = async (categoryId) => {
        try {
            const response = await api.patch(`/categories/${categoryId}/close`);
            const updatedCategory = response.data;
            setCategories(categories.map((category) => (category._id === categoryId ? updatedCategory : category)));

            setAlertMessage('Votes closed successfully.'); // Add this line for successful vote closure message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds
        } catch (error) {
            console.error('Error during vote closure:', error);

            setAlertMessage('Error closing votes. Please try again.'); // Add this line for error message
            setTimeout(() => setAlertMessage(''), 3000); // Remove the message after 3 seconds
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <h1>Create a Voting Category</h1>
            {!isVotingOpen && <CategoryForm onCategoryCreate={handleCategoryCreation} />}
            <div>
                {user &&
                    categories.map((category) => {
                        console.log('Rendering category:', category);
                        return (
                            <CategoryCard
                                key={category._id}
                                category={category}
                                isMaster={user.isMaster}
                                onDelete={handleCategoryDeletion}
                                onCloseVotes={handleVoteClosure}
                            />
                        );
                    })}
            </div>
            {alertMessage && (
                <div className={`${styles.alert} ${alertMessage.startsWith('Error') ? styles.alertError : styles.alertSuccess}`}>
                    {alertMessage}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default MasterPage;