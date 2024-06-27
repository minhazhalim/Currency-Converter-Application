const select = document.querySelectorAll('form select');
const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
const button = document.querySelector('form button');
const icon = document.querySelector('form .icon');
for(let i = 0;i < select.length;i++){
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == 'USD' ? 'selected' : "" : currency_code == 'NPR' ? 'selected' : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        select[i].insertAdjacentHTML('beforeend',optionTag);
    }
    select[i].addEventListener('change',event =>{
        loadFlag(event.target);
    });
}
function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector('img');
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}
function getExchangeRate(){
    const input = document.querySelector('form input');
    const exchangeRate = document.querySelector('form .exchange-rate');
    let amountValue = input.value;
    if(amountValue == "" || amountValue == '0'){
        input.value = '1';
        amountValue = 1;
    }
    exchangeRate.innerText = 'Getting Exchange Rate...';
    let url = `https://v6.exchangerate-api.com/v6/5d191a7bdaaf071c178ea20a/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRateResult = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountValue * exchangeRateResult).toFixed(2);
        exchangeRate.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRate.innerText = 'Something Went Wrong';
    });
}
window.addEventListener('load',() => {
    getExchangeRate();
});
button.addEventListener('click',event =>{
    event.preventDefault();
    getExchangeRate();
});
icon.addEventListener('click',()=>{
    let temporaryCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temporaryCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});