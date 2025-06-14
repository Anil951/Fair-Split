# FAIR SPLIT

FAIR SPLIT is a React-based web application designed to track and manage shared expenses among a group of users. This application allows users to add individual expenses, specify who participated in each expense, and see how much each person owes. The app calculates the total expenses for each user and provides detailed breakdowns of each expense.

## Features

- Add users who participated in the expense.
- Add expenses with detailed breakdowns for each user.
- Calculate each user's share based on what they actually consumed.
- Dark mode toggle functionality.
- Simple, one-time-use application without the need for a backend database.

## Demo
https://github.com/user-attachments/assets/fb374a0a-31e0-4b48-a800-8d3670d8ff7f


## Usage

1. **Add Users:** Input the names of users who participated in the shared expense.
2. **Add Expenses:** Input the details of each expense, specifying the amount and who participated in it.
3. **View Breakdown:** See the detailed breakdown of expenses for each user, ensuring fair contribution based on consumption.

### Example

Imagine a scenario where four friends, A, B, C dine together at a restaurant, incurring a total expense of ₹1500. At first glance, this could be split evenly at ₹500 each. 

However, "FAIR SPLIT" takes it a step further by accommodating different categories of expenses. For instance, if the total bill includes ₹900 for Biryani shared by all three friends and ₹600 for Tandoori shared only by A and B, the application calculates each member's share in detail. With "FAIR SPLIT," A and B pay ₹600 each, while C pay only ₹300, ensuring that everyone contributes fairly based on what they actually consumed.

<img width="456" alt="sample" src="https://github.com/Anil951/Fair-Split/assets/115132631/8ef38c8f-280b-4200-bb72-d7f3fc862885">


## Installation

1. Clone the repository:
    `git clone https://github.com/Anil951/Fair-Split.git`
    `cd Fair-Split`
2. Install dependencies:
    `npm install`
4. Start the development server:
    `npm start`
5. Open your browser and navigate to `http://localhost:3000` to use the application.


## Detailed working  
`of ExpenseTracker.js`

- add users, expenses, and calculate how much each person owes.
    useState manages various states:
    1. users: An array to store user data (name, expense amount, etc.).
    <a href="https://github.com/Anil951/Fair-Split/blob/main/adduser_notes.md" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; border-radius: 5px; text-decoration: none;">view explanation</a>
    
    2. expenses: An array to store the list of expenses.
    <a href="https://github.com/Anil951/Fair-Split/blob/main/addexpenses_notes.md" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; border-radius: 5px; text-decoration: none;">view explanation</a>
    
    3. detailsVisible: Tracks whether detailed information for each user is visible.
    <a href="https://github.com/Anil951/Fair-Split/blob/main/detailsvisible_notes.md" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; border-radius: 5px; text-decoration: none;">view explanation</a>

- useEffect automatically recalculates user expenses whenever the users or expenses state changes. This ensures the displayed values stay up-to-date.
  <a href="https://github.com/Anil951/Fair-Split/blob/main/useefffect_notes.md" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; border-radius: 5px; text-decoration: none;">view explanation</a>


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any feature additions or bug fixes.

## Acknowledgments

- The project uses *React*, a JavaScript library for building user interfaces.
- Icons by *Font Awesome*.






