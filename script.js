const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});
// Get reference to the reset button
const resetBtn = document.getElementById("reset-btn");

// Add event listener to reset button
resetBtn.addEventListener("click", (e) => {
  
  // Clear the selected seats
  const selected = document.querySelectorAll(".seat.selected");
  selected.forEach((seat) => {
    seat.classList.remove("selected");
  });

  // Update the UI to reflect changes
  updateSelectedCount();
});
// intial count and total
updateSelectedCount();

// Set the show times in milliseconds
const showTimes = [
  new Date().setHours(10, 0, 0, 0),
  new Date().setHours(14, 0, 0, 0),
  new Date().setHours(18, 0, 0, 0)
];

// Find the next show time
const now = Date.now();
let nextShowTime = null;
for (let i = 0; i < showTimes.length; i++) {
  if (showTimes[i] > now) {
    nextShowTime = showTimes[i];
    break;
  }
}
if (!nextShowTime) {
  nextShowTime = showTimes[0] + 24 * 60 * 60 * 1000;
}

// Update the show time display
const showTimeElement = document.getElementById('show-time');
showTimeElement.textContent = new Date(nextShowTime).toLocaleTimeString();

// Update the countdown timer
const countdownElement = document.getElementById('countdown');
setInterval(() => {
  const now = Date.now();
  const timeLeft = nextShowTime - now;
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
  const secondsLeft = Math.floor((timeLeft / 1000) % 60);
  countdownElement.textContent = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}, 1000);


