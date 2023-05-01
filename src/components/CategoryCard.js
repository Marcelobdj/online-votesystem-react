import React from 'react';
import styles from './CategoryCard.module.css'; // Import styles

const CategoryCard = ({ category, isMaster, onDelete, onCloseVotes }) => {

    console.log('Category prop:', category); // Debug line

    if (!category) {
        return null;
    }

    const { _id, name, options, votes, isClosed } = category;

    const handleDelete = () => {
        onDelete(_id);
    };

    const handleCloseVotes = () => {
        onCloseVotes(_id);
    };

    const voteResults = votes.reduce((acc, vote) => {
        acc[vote.option] = (acc[vote.option] || 0) + 1;
        return acc;
    }, {});

    const winner = Object.keys(voteResults).reduce((a, b) => (voteResults[a] > voteResults[b] ? a : b), '');

    return (
        <div className={styles.card}>
            <h2>{name}</h2>
            <ul>
                {options.map((option, index) => (
                    <li key={index}>{option}</li>
                ))}
            </ul>
            {votes.map((vote, index) => (
                <p key={index}>{`${vote.user}: ${vote.option}`}</p>
            ))}
            {isClosed && <p>Winner: {winner} with {voteResults[winner]} votes</p>}
            {isMaster && (
                <>
                    <button onClick={handleDelete}>Delete Category</button>
                    <button onClick={handleCloseVotes} disabled={isClosed}>
                        Close Votes
                    </button>
                </>
            )}
        </div>
    );
};

export default CategoryCard;