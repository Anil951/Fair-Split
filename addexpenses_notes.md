## expenses

- Initial State (expenses):
expenses is the state variable that holds an array of expenses. Initially, it is set to an empty array [], meaning no expenses have been added when the component first loads.

- Updating State (setExpenses):
setExpenses is the state updater function. This function is used whenever you need to change or update the expenses state.
Every time setExpenses is called with a new value (like a new expense), React updates the expenses array and re-renders the component to show the new data.


## WORKING:

1. Initial Value:
  When the component first renders, the expenses state is an empty array []. This means there are no expenses listed initially.

2. Adding a New Expense:
  When the user clicks the "Add Expense" button, the addExpense function is called. This function adds a new expense to the expenses array:

  `
  const addExpense = () => {
    const newExpense = {
      title: Expense${expenses.length + 1},
      items: [],
      isEditing: false
    };
    setExpenses([...expenses, newExpense]); // Adds the new expense to the array
  };
  `

newExpense is an object containing:
  - title: The title of the expense, which is generated based on the current number of expenses (Expense${expenses.length + 1}).
  - items: An empty array that will hold the individual items associated with this expense.
  - isEditing: A flag to track if the expense is being edited (initially set to false).
  - setExpenses([...expenses, newExpense]); updates the expenses array by adding the new expense to the existing list of expenses.

3. Displaying Expenses:
  Once an expense is added, the component re-renders, and the new expense will be displayed in the UI.
  we use expenses.map() to loop through the array and display each expense's details (like the title) on the screen:

  `
  {expenses.map((expense, expenseIndex) => (
      <div key={expenseIndex} className="expense">
        <div className="expense-title">
          <b>Title:</b> {expense.title}
        </div>
      </div>
    ))}
  `

  This takes the expenses array, loops over it, and shows each expense's title in a designated area.
