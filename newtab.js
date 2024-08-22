document.addEventListener('DOMContentLoaded', function () {

  //day
  function displayDayOfWeek() {
    // Array of days of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Get the current date
    const now = new Date();

    // Get the day of the week (0-6) from the date
    const dayIndex = now.getDay();

    // Get date
    const date = now.getDate();

    // Get month
    const month = now.getMonth();

    // Get the name of the day from the array
    const dayName = daysOfWeek[dayIndex];

    const monthName = months[month];

    // Display the day of the week
    const dayOfWeekElement = document.getElementById('day-of-week');
    dayOfWeekElement.textContent = `${dayName}, ${monthName} ${date}`;
  }
  displayDayOfWeek();

  // Clock
  function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock();

  //Quote
  function fetchQuote() {
    fetch('https://api.quotable.io/quotes/random') // Replace 'https://example.com/api/quote' with the actual API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayQuote(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  function displayQuote(data) {
    const quoteContainer = document.getElementById('quote');
    quoteContainer.innerHTML = ''; // Clear previous content

    const quoteText = document.createElement('p');
    quoteText.textContent = `${data[0].content} - ${data[0].author}`;
    quoteContainer.appendChild(quoteText);
  }

  fetchQuote();

  // Motivational Quote
  // const quotes = [
  //   "The only way to do great work is to love what you do. - Steve Jobs",
  //   "The best way to predict the future is to invent it. - Alan Kay",
  //   "You miss 100% of the shots you don't take. - Wayne Gretzky",
  //   // Add more quotes here
  // ];
  // const quoteElement = document.getElementById('quote');
  // quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  // To-Do List
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  function renderTodoList() {
    chrome.storage.sync.get(['todos'], function (result) {
      const todos = result.todos || [];
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;
        li.addEventListener('click', () => {
          removeTodoItem(index);
        });
        todoList.appendChild(li);
      });
    });
  }

  function addTodoItem(todo) {
    chrome.storage.sync.get(['todos'], function (result) {
      const todos = result.todos || [];
      todos.push(todo);
      chrome.storage.sync.set({ todos: todos }, renderTodoList);
    });
  }

  function removeTodoItem(index) {
    chrome.storage.sync.get(['todos'], function (result) {
      let todos = result.todos || [];
      todos.splice(index, 1);
      chrome.storage.sync.set({ todos: todos }, renderTodoList);
    });
  }

  todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && todoInput.value) {
      addTodoItem(todoInput.value);
      todoInput.value = '';
    }
  });

  renderTodoList();



});
