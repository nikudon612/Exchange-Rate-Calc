const url =
  "http://data.fixer.io/api/latest?access_key=1214f270c6e9fd57f4f8ad070add11d7&format=1";

const currencyElOne = document.getElementById("first-currency");
const amountOne = document.getElementById("first-amount");
const currencyElTwo = document.getElementById("second-currency");
const amountTwo = document.getElementById("second-amount");
//rate element constant
const rateEl = document.getElementById("rate");
//swap button constant
const swap = document.getElementById("swap");
//GLOBAL VARIABLES ^

document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => calculate(data));
});

//fetch exchange rates and update value in DOM
function calculate() {
  const first_Currency = currencyElOne.value;
  const second_Currency = currencyElTwo.value;

  fetch(
    `http://data.fixer.io/api/latest?access_key=1214f270c6e9fd57f4f8ad070add11d7&format=1/${first_Currency}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      const firstRate = data.rates[first_Currency];
      const secondRate = data.rates[second_Currency];
      const newRate = secondRate / firstRate;

      const cleanNewRate = parseFloat(newRate).toFixed(2);
      rateEl.innerText = `1 ${first_Currency} = ${cleanNewRate} ${second_Currency}`;

      amountTwo.value = (amountOne.value * newRate).toFixed(2);
    });
}

//Event Listeners
currencyElOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyElTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

//swap value button
swap.addEventListener("click", () => {
  const tempValue = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = tempValue;
  calculate();
});

//Initialize
calculate();
