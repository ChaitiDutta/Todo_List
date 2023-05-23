import React, { useState, useEffect } from 'react';
import './TodoList.css';


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoName, setEditTodoName] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  useEffect(() => {
    // Fetch todos from the backend or any other data source
    // Example: fetchTodos();
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const handleCreateTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        name: newTodo,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditTodoId(id);
      setEditTodoName(todoToEdit.name);
    }
  };

  const handleSaveEditTodo = () => {
    if (editTodoId !== null && editTodoName.trim() !== '') {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, name: editTodoName };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditTodoId(null);
      setEditTodoName('');
    }
  };

  const sortedTodos = todos.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });


  return (
    <div className="todo-list">
      <h1>To-Do List</h1>

    <div className="add-todo">
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Enter a new to-do item"
        />
      <button className="add-button" onClick={handleCreateTodo}>Add</button>
        </div>

      <div className="sort">
        <button  className = 'sorted' onClick={handleSortChange}>
          Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
         {/* <label htmlFor="sort-order">Sort Order:</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select> */}
      </div>

      <ul className="todo-items">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            {editTodoId === todo.id ? (
              <input
                type="text"
                value={editTodoName}
                onChange={(event) => setEditTodoName(event.target.value)}
              />
            ) : (
              <span>{todo.name}</span>

            )}
            {editTodoId === todo.id ? (
                <button className="save-button" onClick={handleSaveEditTodo}>Save</button>
                ) : (
                    <button className="edit-button" onClick={() => handleEditTodo(todo.id)}>Edit</button>
                    )}
                    <div className='align'>
            <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
