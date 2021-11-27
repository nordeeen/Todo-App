'use strict';

// Fetch exiting todos from localStorage
// getSavedTodos
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');

  // Handling Application Error
  try {
    return todosJSON ? JSON.parse(todosJSON) : []; // implement truthy value
  } catch (error) {
    console.log('error name :', error.name);
    console.log('error message :', error.message);
  }
};

// Save todos to localStorage
// saveTodos
const saveTodos = todos => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Render application todos based on filters
// renderTodos
const renderTodos = (todos, filters) => {
  const todosEl = document.querySelector('#todos');
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch =
      filters.hideCompleted === false || todo.completed === false;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompletedTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  todosEl.innerHTML = '';
  todosEl.appendChild(generateSummaryDOM(incompletedTodos));

  // when todo is empty
  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      todosEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'No to-dos to show';
    todosEl.appendChild(messageEl);
  }
};

// Remove a todo from the list
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle the completed value for a given todo
const toggleTodo = id => {
  const toggleTodo = todos.find(todo => todo.id === id);

  // implement truthy value
  if (toggleTodo) {
    toggleTodo.completed = toggleTodo.completed === false;
  }
};

// 1. buat label di dom todoEl
// 2. buat dom containerEl bikin div
// 3. containerEl tambahkan node checkbox
// 4. containerEl tambahkan node todoText
// 5. buat class untuk todoEl yaitu list-item
// 6. buat class untuk containerEl yaitu list-item__container
// 7. todoEl tambahkan node containerEl
// 8. ubah removeBotton menjadi remove
// 9. tambahkan class di removeButton 'button', 'button--text'
// 10. todoEl tambahkan node removeButton

// Get the DOM elements for an individual note
// generateTodoDOM
const generateTodoDOM = todo => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  // Setup todo checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Setup the remove button
  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get the DOM elements for list summary
// generateSummaryDOM
const generateSummaryDOM = incompletedTodos => {
  const summary = document.createElement('h2');
  const plural = incompletedTodos.length === 1 ? '' : 's';
  summary.classList.add('list-title');
  summary.textContent = `You have ${incompletedTodos.length} todo ${plural} left`;
  // summary.textContent = `You have ${incompletedTodos.length} todos ${plural} left.`;
  return summary;
};

/*
const toggleTodo = function (id) {
  const todo = todos.find(function (todo) {
    return todo.id === id;
  });

  if (todo !== undefined) {
    todo.completed = todo.completed === false;
  }
};


*/
