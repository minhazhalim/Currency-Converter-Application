import {useState,useEffect} from 'react';
import CurrencySelect from './currencySelect.jsx';
const ConverterForm = () => {
     const [amount,setAmount] = useState(100);
     const [fromCurrency,setFromCurrency] = useState('USD');
     const [toCurrency,setToCurrency] = useState('INR');
     const [result,setResult] = useState("");
     const [isLoading,setIsLoading] = useState(false);
     const handleSwapCurrencies = () => {
          setFromCurrency(toCurrency);
          setToCurrency(fromCurrency);
     };
     const getExchangeRate = async () => {
          const API_KEY = '5d191a7bdaaf071c178ea20a';
          const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
          if(isLoading) return;
          setIsLoading(true);
          try {
               const response = await fetch(API_URL);
               if(!response.ok) throw Error('Something Went Wrong!');
               const data = await response.json();
               const rate = (data.conversion_rate * amount).toFixed(2);
               setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
          }catch(error){
               setResult('Something Went Wrong!');
          }finally {
               setIsLoading(false);
          }
     };
     const handleFormSubmit = (event) => {
          event.preventDefault();
          getExchangeRate();
     }
     useEffect(() => getExchangeRate);
     return (
          <form className="converter-form" onSubmit={handleFormSubmit}>
               <div className="form-group">
                    <label className="form-label">enter amount</label>
                    <input type="number" className="form-input" value={amount} onChange={(event) => setAmount(event.target.value)} required/>
               </div>
               <div className="form-group form-currency-group">
                    <div className="form-section">
                         <label className="form-label">From</label>
                         <CurrencySelect selectedCurrency={fromCurrency} handleCurrency={event => setFromCurrency(event.target.value)}/>
                    </div>
                    <div className="swap-icon" onClick={handleSwapCurrencies}>
                         <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                              fill="#fff"/>
                         </svg>
                    </div>
                    <div className="form-section">
                         <label className="form-label">To</label>
                         <CurrencySelect selectedCurrency={toCurrency} handleCurrency={event => setToCurrency(event.target.value)}/>
                    </div>
               </div>
               <button type="submit" className={`${isLoading ? "loading" : ""} submit-button`}>get exchange rate</button>
               <p className="exchange-rate-result">{isLoading ? "Getting exchange rate..." : result}</p>
          </form>
     );
};
export default ConverterForm;