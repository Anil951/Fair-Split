import React, { useState, useEffect } from 'react';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState([]);

  useEffect(() => {
    const calculateUserExpenses = () => {
      return users.map(user => ({
        ...user,
        expense: expenses.reduce((total, expense) => {
          const selectedItems = expense.items.filter(item =>
            item.users.find(u => u.id === user.name && u.checked)
          );
          const totalValue = selectedItems.reduce((sum, item) => sum + (item.value / item.users.filter(u => u.checked).length), 0);
          return total + totalValue;
        }, 0)
      }));
    };

    const newUserList = calculateUserExpenses();
    
    if (JSON.stringify(newUserList) !== JSON.stringify(users)) {
      setUsers(newUserList);
    }
  }, [expenses, users]);

  const addUser = () => {
    const newUser = {
      name: `User${users.length + 1}`,
      expense: 0,
      isEditing: false
    };
    setUsers([...users, newUser]);
    setDetailsVisible([...detailsVisible, false]);

    const updatedExpenses = expenses.map(expense => ({
      ...expense,
      items: expense.items.map(item => ({
        ...item,
        users: [...item.users, { id: newUser.name, checked: false }]
      }))
    }));
    setExpenses(updatedExpenses);
  };

  const handleNameChange = (index, event) => {
    const newUsers = [...users];
    const newName = event.target.value;
    const oldName = newUsers[index].name;

    newUsers[index].name = newName;

    const newExpenses = expenses.map(expense => ({
      ...expense,
      items: expense.items.map(item => ({
        ...item,
        users: item.users.map(user => user.id === oldName ? { ...user, id: newName } : user)
      }))
    }));

    setUsers(newUsers);
    setExpenses(newExpenses);
  };

  const deleteUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    const userName = users[index].name;

    setUsers(newUsers);
    setExpenses(expenses.map(expense => ({
      ...expense,
      items: expense.items.map(item => ({
        ...item,
        users: item.users.filter(user => user.id !== userName)
      }))
    })));
    setDetailsVisible(detailsVisible.filter((_, i) => i !== index));
  };

  const toggleDetails = (index) => {
    const newDetailsVisible = [...detailsVisible];
    newDetailsVisible[index] = !newDetailsVisible[index];
    setDetailsVisible(newDetailsVisible);
  };

  const toggleEditUser = (index) => {
    const newUsers = [...users];
    newUsers[index].isEditing = !newUsers[index].isEditing;
    setUsers(newUsers);
  };

  const saveUserName = (index) => {
    const newUsers = [...users];
    newUsers[index].isEditing = false;
    setUsers(newUsers);
  };

  const addExpense = () => {
    const newExpense = {
      title: `Expense${expenses.length + 1}`,
      items: [],
      isEditing: false
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleExpenseTitleChange = (index, event) => {
    const newExpenses = [...expenses];
    newExpenses[index].title = event.target.value;
    setExpenses(newExpenses);
  };

  const addExpenseItem = (expenseIndex) => {
    const newExpenses = [...expenses];
    newExpenses[expenseIndex].items.push({
      expense: '',
      value: 0,
      users: users.map(user => ({
        id: user.name,
        checked: false
      }))
    });
    setExpenses(newExpenses);
  };

  const handleExpenseItemChange = (expenseIndex, itemIndex, key, value) => {
    const newExpenses = [...expenses];
    newExpenses[expenseIndex].items[itemIndex][key] = key === 'value' ? parseFloat(value) || 0 : value;
    setExpenses(newExpenses);
  };

  const handleCheckboxChange = (expenseIndex, itemIndex, userId) => {
    const newExpenses = [...expenses];
    const userIndex = newExpenses[expenseIndex].items[itemIndex].users.findIndex(user => user.id === userId);
    newExpenses[expenseIndex].items[itemIndex].users[userIndex].checked = !newExpenses[expenseIndex].items[itemIndex].users[userIndex].checked;
    setExpenses(newExpenses);
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const deleteExpenseItem = (expenseIndex, itemIndex) => {
    const newExpenses = [...expenses];
    newExpenses[expenseIndex].items = newExpenses[expenseIndex].items.filter((_, i) => i !== itemIndex);
    setExpenses(newExpenses);
  };

  const toggleEditExpense = (index) => {
    const newExpenses = [...expenses];
    newExpenses[index].isEditing = !newExpenses[index].isEditing;
    setExpenses(newExpenses);
  };

  const saveExpenseTitle = (index) => {
    const newExpenses = [...expenses];
    newExpenses[index].isEditing = false;
    setExpenses(newExpenses);
  };

  return (
    <div className="expense-tracker">
      <button className="add-user-button" onClick={addUser}>Add User</button>
      <div className="users-container">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <div className="user-actions">
              {user.isEditing ? (
                <button className="save-button" onClick={() => saveUserName(index)}>
                  <i className="fas fa-check"></i>
                </button>
              ) : (
                <button className="edit-button" onClick={() => toggleEditUser(index)}>
                  <i className="fas fa-edit"></i>
                </button>
              )}
              <button className="delete-button" onClick={() => deleteUser(index)}>
                <i className="fas fa-trash-alt"></i>
              </button>
              <button className="toggle-details-button" onClick={() => toggleDetails(index)}>
                {detailsVisible[index] ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
              </button>
            </div>
            {user.isEditing ? (
              <input
                type="text"
                value={user.name}
                onChange={(event) => handleNameChange(index, event)}
                autoFocus
              />
            ) : (
              <div className="user-details">
                <div>
                  <b>Name:</b> {user.name}
                </div>
                <div><b>Expense:</b> ₹{user.expense.toFixed(2)}</div>
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
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="add-expense-button" onClick={addExpense}>Add Expense</button>
      <div className="expenses-container">
        {expenses.map((expense, expenseIndex) => (
          <div key={expenseIndex} className="expense">
            <div className="expense-actions">
              {expense.isEditing ? (
                <button className="save-button" onClick={() => saveExpenseTitle(expenseIndex)}>
                  <i className="fas fa-check"></i>
                </button>
              ) : (
                <button className="edit-button" onClick={() => toggleEditExpense(expenseIndex)}>
                  <i className="fas fa-edit"></i>
                </button>
              )}
              <button className="delete-button" onClick={() => deleteExpense(expenseIndex)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
            {expense.isEditing ? (
              <input
                type="text"
                placeholder="Expense Title"
                value={expense.title}
                onChange={(event) => handleExpenseTitleChange(expenseIndex, event)}
                autoFocus
              />
            ) : (
              <div className="expense-title">
                <b>Title:</b> {expense.title}
              </div>
            )}
            <button className="add-bill-button" onClick={() => addExpenseItem(expenseIndex)}>Add Bill</button>
            {expense.items.map((item, itemIndex) => (
              <div key={itemIndex} className="expense-item">
                <div className="expense-item-row">
                  <button className="delete-button" onClick={() => deleteExpenseItem(expenseIndex, itemIndex)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  <input
                    type="text"
                    placeholder="Expense"
                    value={item.expense}
                    onChange={(event) => handleExpenseItemChange(expenseIndex, itemIndex, 'expense', event.target.value)}
                  />
                  <div className="currency-input">
                    <span className="currency-symbol">₹</span>
                    <input
                      type="number"
                      placeholder="Value"
                      value={item.value === 0 ? '' : item.value}
                      onChange={(event) => handleExpenseItemChange(expenseIndex, itemIndex, 'value', parseFloat(event.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="expense-checkboxes">
                  {item.users.map((user, userIndex) => (
                    <label key={userIndex} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={user.checked}
                        onChange={() => handleCheckboxChange(expenseIndex, itemIndex, user.id)}
                      />
                      {user.id}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTracker;
