'use strict';

const todos = getSavedTodos();

// 1. Delete dummy data
// 2. Read and parse the data when the app starts up
// 3. Stringify and write the data when new data is added

const filters = {
  searchText: '',
  hideCompleted: false,
};

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector('#new-todos').addEventListener('submit', e => {
  const text = e.target.elements.text.value.trim();
  e.preventDefault();

  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text: text,
      completed: false,
    });
  }

  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.text.value = '';
});

document.querySelector('#hideCompleted').addEventListener('change', e => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});

// textContent = Menetapkan atau mengembalikan konten tekstual dari sebuah simpul dan turunannya.

// 1. Setup a div contain for todos.
// 2. Setup filters (searchText) and wire up a new filter input to change it.

// 1. create a form with a single input for todo text
// 2. setup an submit handler and cancel the default action
// 3. add a new item to the todos array with that text data (completed value of false)
// 4. rerender the application
// 5. clear the input field value

// 3. Create a renderTodos function to render and rerender the latest filtered data.
// 1. Create a checkbox and setup even listener -> 'hide completed'
// 2. Create new hideCompleted filter (default false)
// 3. Update hideCompleted an rerender list on checkbox change
// 4. setup renderTodos to remove completed items

/*
#PENAMPUNGAN CODE YANG TIDAK DIGUNAKAN LAGI

// Listen for add new todo creation
document.querySelector('#add-todo').addEventListener('click', function (e) {
  console.log('Add a new todo ... !!!');
});

// Listen for todo text change
document
  .querySelector('#new-todo-text')
  .addEventListener('input', function (e) {
    console.log(e.target.value);
  });

  const paragraph = document.querySelectorAll('p');
  paragraph.forEach(function (paragraph) {
    if (paragraph.textContent.includes('the')) {
      paragraph.remove();
    }
  });

*/
