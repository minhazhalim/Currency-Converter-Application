const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');
function calculate(){
     const currency1 = currencyOne.value;
     const currency2 = currencyTwo.value;
     fetch('https://open.exchangerate-api.com/v6/latest')
          .then(response => response.json())
          .then(data => {
               const rating = data.rates[currency2] / data.rates[currency1];
               rate.innerText = `1 ${currency1} = ${rating} ${currency2}`;
               amountTwo.value = (amountOne.value * (rating)).toFixed(2);
          });
}
calculate();
swap.addEventListener('click',() => {
     const temporary = currencyOne.value;
     currencyOne.value = currencyTwo.value;
     currencyTwo.value = temporary;
     calculate();
});
currencyOne.addEventListener('change',calculate);
currencyTwo.addEventListener('change',calculate);
amountOne.addEventListener('input',calculate);
amountTwo.addEventListener('input',calculate);