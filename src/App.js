import React, { useState } from 'react';
import ExpenseTracker from './ExpenseTracker';
import ThemeToggle from './ThemeToggle';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const openGithubRepo = () => {
    // Replace 'YOUR_GITHUB_REPO_LINK' with your actual GitHub repository link
    window.open('https://github.com/Anil951/Fair-Split', '_blank');
  };

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <header>
        <div id='title'>
          <div><h2>FAIR SPLIT</h2></div>
          <div>
            <button className="info-button" onClick={toggleInfo}>
              <i className="fas fa-info-circle"></i>
            </button>
          </div>
        </div>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <main>
        {showInfo ? (
          <div className="info-panel">
            <p>
              <b>OVERVIEW</b> <br></br><br></br>
              This project is a React-based web application designed to track and manage shared expenses among a group of users. <br></br><br></br>
              Users can add individual expenses, specify who participated in each expense, and see how much each person owes. The app calculates the total expenses for each user and provides detailed breakdowns of each expense.<br></br><br></br>
              This project aims to simplify group expense management without needing a backend database, making it a convenient, one-time use application for various social scenarios.<br></br><br></br>
              Imagine a scenario where four friends, A, B, C, and D, dine together at a restaurant, incurring a total expense of 1000. At first glance, this could be split evenly at 250 each. <br></br>
              However, "<b>FAIR SPLIT</b>" takes it a step further by accommodating different categories of expenses. For instance, if the total bill includes 750 for Biryani shared by all four friends and 250 for Tandoori shared only by A and B, the application calculates each member's share in detail. With "FAIR SPLIT," A and B pay 312.5 each, while C and D pay only 187.5, ensuring that everyone contributes fairly based on what they actually consumed.
               
            </p>
            <button className="github-button" onClick={openGithubRepo}>
              View on GitHub <img src="github.png" alt="GitHub Logo" style={{ width: '25px', height: '25px' }}/>
            </button>
          </div>
        ) : (
          <ExpenseTracker />
        )}
      </main>
    </div>
  );
}

export default App;
