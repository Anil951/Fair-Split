# details visible

- Initial State (detailsVisible):
  detailsVisible is the state variable that holds an array of boolean values, with each value corresponding to whether the details of a specific user are visible or not.
  Initially, it is set to an empty array [], meaning no user details are being shown when the component first loads.

- Updating State (setDetailsVisible):
  setDetailsVisible is the state updater function. This function is used whenever you need to change or update the detailsVisible state.
  When you call setDetailsVisible, you typically pass a new array that indicates which users' details should be visible.


## WORKING:

1. Initial Value:
  When the component first renders, detailsVisible is an empty array [], meaning that no user details are being displayed.

2. Adding a New User:
  When a new user is added using the addUser function, the corresponding value in detailsVisible is set to false to indicate that the details for this user are not visible yet:

  `const addUser = () => {
  const newUser = {
    name: User${users.length + 1},
    expense: 0,
    isEditing: false
  };
  setUsers([...users, newUser]);
  setDetailsVisible([...detailsVisible, false]); // Adds a new entry for the new user, initially false
};`

  This ensures that when a new user is added, their details are hidden by default.

3. Toggling Visibility:
  When a user clicks on the toggle details button, the toggleDetails function is called, which updates the corresponding index in detailsVisible to either true or false:

   `
   const toggleDetails = (index) => {
    const newDetailsVisible = [...detailsVisible];
    newDetailsVisible[index] = !newDetailsVisible[index]; // Toggles the visibility
    setDetailsVisible(newDetailsVisible);
  };`




  This toggles the visibility of that user's details. If the details were visible, they become hidden, and vice versa.

4. Displaying User Details:
  The detailsVisible array is checked to determine whether to display the details for each user. When rendering, it looks like this:

    ```javascript
    {detailsVisible[index] && (
          <div>
            <b>Details:</b>
            <ul>
              {expenses.map((expense, expenseIndex) => (
                <li key={expenseIndex}>
                  <b>{expense.title}</b>
                  {expense.items.filter(item =>
                    item.users.find(u => u.id === user.name && u.checked)
                  ).map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <span>{item.expense}: ₹{(item.value / item.users.filter(u => u.checked).length).toFixed(2)}</span>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
    };
    ```

  Here, detailsVisible[index] is checked. If it is true, the details for that user are displayed; if false, they are hidden.
