import { useState } from 'react'
import './App.css'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
function App() {
  const [amount, setAmount] = useState(null)
  const [From, setFrom] = useState("usd")
  const [To, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(null)

  const currencyInfo = useCurrencyInfo(From)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(To)
    setTo(From)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[To])
  }
  return (
    <div
      className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
      style={{backgroundColor: "#313131"}}>
        <div className='w-full'>
            <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
              <h1 className='p-2 font-bold font-sans mb-1 text-center text-gray-900 text-xl'>Currency Convertor</h1>
              <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    convert(); 
                  }}>
                  <div className='w-full mb-1'>
                    <InputBox  
                      label="From" 
                      amount={amount}
                      currencyOptions={options}
                      onCurrencyChange={(currency) => setFrom(currency)}
                      selectCurrency={From}
                      onAmountChange={(amount)=> setAmount(amount)}
                      />
                  </div>
                  <div className='relative w-full h-0.5'>
                    <button 
                      type='button' 
                      className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                      onClick={swap}>
                        swap
                    </button>
                  </div>
                  <div className='w-full mt-1 mb-4'>
                    <InputBox 
                      label="To"
                      amount={convertedAmount}
                      currencyOptions={options}
                      onCurrencyChange={(currency) => setTo(currency)}
                      selectCurrency={To}
                      amountDisable
                    />
                  </div>
                  <button
                    type='submit'
                    className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'>
                      Convert {From.toUpperCase()} to {To.toUpperCase()}
                    </button>
              </form>
            </div>
        </div>
      </div>
  )
}

export default App
