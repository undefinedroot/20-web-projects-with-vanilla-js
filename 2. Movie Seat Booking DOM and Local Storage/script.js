const container = document.querySelector('.container');
// grab all child elements inside .row with class of .seat without .occupied class and return a NodeList
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// convert value to Number type by using +prefix
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  // get elements inside .row that has both .seat and .selected class, return NodeList
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // copy selected seats into arrary
  // map through array (.forEach() only loops, .map() loops and returns an array)
  // return a new array indexes
  // we loop the only selected seats
  // we cycle through each selected seats and get the index based on all existing seats
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  // save selected seats to localStorage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // if found, -1; not found
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  // setup the selector index
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  // look in class list
  if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')) {

    // so that you can remove/toggle the class
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// initial count and total set
updateSelectedCount();