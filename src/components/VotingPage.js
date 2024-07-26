import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const categories = {
  provincial: ['Candidate A', 'Candidate B', 'Candidate C'],
  regional: ['Candidate D', 'Candidate E', 'Candidate F'],
  national: ['Candidate G', 'Candidate H', 'Candidate I'],
};

function VotingPage() {
  const { user } = useAuth();
  const [votes, setVotes] = useState({
    provincial: '',
    regional: '',
    national: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('You must be logged in to vote.');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleVoteChange = (category, candidate) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [category]: candidate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to vote.');
      navigate('/login');
      return;
    }
    localStorage.setItem('votes', JSON.stringify(votes));
    console.log('Votes submitted:', votes);
    navigate('/thank-you');
  };

  return (
    <div>
      <h2>Voting Page</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(categories).map((category) => (
          <div key={category}>
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Votes</h3>
            {categories[category].map((candidate) => (
              <div key={candidate}>
                <input
                  type="radio"
                  id={`${category}-${candidate}`}
                  name={category}
                  value={candidate}
                  checked={votes[category] === candidate}
                  onChange={() => handleVoteChange(category, candidate)}
                />
                <label htmlFor={`${category}-${candidate}`}>{candidate}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit Votes</button>
      </form>
    </div>
  );
}

export default VotingPage;
