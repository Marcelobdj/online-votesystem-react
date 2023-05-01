import React, { useState } from 'react';

const VoteForm = ({ voteOptions, onVoteSubmit }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onVoteSubmit(selectedOption);
    };

    return (
        <form onSubmit={handleSubmit}>
            {voteOptions.map((option, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        id={`option-${index}`}
                        name="voteOption"
                        value={option}
                        onChange={() => setSelectedOption(option)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                </div>
            ))}
            <button type="submit" disabled={!selectedOption}>
                Submit Vote
            </button>
        </form>
    );
};

export default VoteForm;