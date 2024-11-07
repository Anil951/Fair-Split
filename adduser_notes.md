# add users

```javascript
const [users, setUsers] = useState([]);
```

- **users** is the state variable that holds an array of users. Initially, it is set to an empty array [] because no users have been added when the component first loads.
- **setUsers** is the state updater function. This function is used whenever you need to change or update the users state. Every time setUsers is called with a new value (like a new user), React updates the users array and re-renders the component to show the new data.

In your ExpenseTracker component, users represents the list of people who will share the expenses.

## WORKING:

1. Initial Value: When the component first renders, the users state is an empty array []. This means there are no users listed initially.

2. Adding a New User: When the user clicks the "Add User" button, the addUser function is called. This function adds a new user to the users array:

  ```javascript
  const addUser = () => {
    const newUser = {
      name: `User${users.length + 1}`,
      expense: 0,
      isEditing: false
    };
    setUsers([...users, newUser]); // Adds the new user to the array
  };
  ```
  
  newUser is an object with the user's name, their expense (which is 0 initially), and isEditing (a flag to track if the user is being edited).
  setUsers([...users, newUser]); updates the users array by adding the new user to the existing list of users ([...users] means we spread the current users into a new array and then add the newUser).

3. Displaying Users:

  Once a user is added, the component re-renders, and the new user will be displayed in the UI.
  In your component, you use users.map() to loop through the array and display each user's details (like their name and expense) on the screen.

   ```javascript
  {users.map((user, index) => (
    <div key={index} className="user-card">
      <div><b>Name:</b> {user.name}</div>
      <div><b>Expense:</b> ₹{user.expense.toFixed(2)}</div>
    </div>
  ))}
  ```
  
  This takes the users array, loops over it, and shows each user's name and their expense in a card format.
