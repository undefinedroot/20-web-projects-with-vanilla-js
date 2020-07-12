const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// to put all people, array of objects [{name, money}]
let data = [];

const MILLION_VALUE = 1000000;

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * MILLION_VALUE)
  }
  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  // create a new array based on manipulating existing array
  // create a new object based off 'data', where we
  //   expand the individual object and then update the property
  //   { ...obj, prop: obj.prop*2 }
  data = data.map(user => ({ ...user, money: user.money * 2 }));
  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  // compare function passed on .sort(), then sort descending
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  // reassign filtered objects
  data = data.filter(user => user.money >= MILLION_VALUE);
  updateDOM();
}

// Calculate total wealth using .reduce() higher order array method
function calculateWealth() {
  const INITIAL_VALUE = 0;
  const wealth = data.reduce((accumulator, user) => (accumulator += user.money), INITIAL_VALUE);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

  main.appendChild(wealthEl);
}

// add new obj to data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update DOM, default parameter value
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  // just loop through all arrays
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
