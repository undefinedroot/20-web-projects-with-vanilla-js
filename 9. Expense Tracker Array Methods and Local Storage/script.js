const balanceEl = document.getElementById('balance'),
  money_plusEl = document.getElementById('money-plus'),
  money_minusEl = document.getElementById('money-minus'),
  listEl = document.getElementById('list'),
  formEl = document.getElementById('form'),
  textEl = document.getElementById('text'),
  amountEl = document.getElementById('amount');

// const dummyTransactions = [
//   {
//     id: 1, text: 'Flower', amount: -20
//   },
//   {
//     id: 2, text: 'Salary', amount: 300
//   },
//   {
//     id: 3, text: 'Book', amount: -10
//   },
//   {
//     id: 4, text: 'Camera', amount: 150
//   }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (textEl.value.trim() === '' || amountEl.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    // turn value of amountEl into 'number' type with '+' prefix
    const transaction = {
      id: generateID(),
      text: textEl.value,
      amount: +amountEl.value
    }

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();
    updateLocalStorage();

    textEl.value = '';
    amount.value = '';
  }
}

// Generate random ID (only for this project)
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  listEl.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  // retrieve the values only
  const amounts = transactions
    .map(transaction => transaction.amount);

  // get the total value of both income and expense
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  // determine total of income only
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  // determine total of expense only
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  balanceEl.innerText = `$${total}`;
  money_plusEl.innerText = `$${income}`;
  money_minusEl.innerText = `$${expense}`
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions
    .filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}


// Init app
function init() {
  listEl.innerHTML = '';
  // pass function by reference
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

formEl.addEventListener('submit', addTransaction);