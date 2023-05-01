import React, { useState } from 'react';
import styles from './CategoryForm.module.css'; // Import styles

const CategoryForm = ({ onCategoryCreate }) => {
    const [categoryName, setCategoryName] = useState('');
    const [voteOptions, setVoteOptions] = useState(['']);

    const handleSubmit = (e) => {
        e.preventDefault();
        const category = {
            name: categoryName,
            options: voteOptions,
        };
        onCategoryCreate(category);
        setCategoryName('');
        setVoteOptions(['']);
    };


    const handleOptionChange = (index, value) => {
        const updatedOptions = voteOptions.map((option, idx) => (idx === index ? value : option));
        setVoteOptions(updatedOptions);
    };

    const addOption = () => {
        setVoteOptions([...voteOptions, '']);
    };

    const removeOption = (index) => {
        setVoteOptions(voteOptions.filter((_, idx) => idx !== index));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Category Name:
                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            </label>
            <div className={styles.voteOptions}>
                Vote Options:
                {voteOptions.map((option, index) => (
                    <div key={index} className={styles.option}>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <button type="button" onClick={() => removeOption(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addOption}>
                    Add Option
                </button>
            </div>
            <button type="submit">Create Category</button>
        </form>
    );
};

export default CategoryForm;