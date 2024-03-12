import React, { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useRef hook 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


const copyPasswordToClipboard =useCallback(()=> {
  // to show that the element is copied we use select() 
  passwordRef.current?.select();
  // to set range of selection of element we use setSelectionRange(from, to)
  passwordRef.current?.setSelectionRange(0, length)
  window.navigator.clipboard.writeText(password)
  alert('text copied successfully')
}, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
    <h1 className=' mt-11 text-yellow-500 text-center my-4 text-5xl'>Random Password Generator</h1>

    <div className='flex items-center flex-col border-solid border-2 max-w-5xl ml-60'>

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-12 text-red-600 bg-emerald-600'>

      <h1 className='text-white text-center my-3'>Password</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value = {password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} 
        />
        <button onClick={copyPasswordToClipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500 active:bg-red-700'>copy</button>
    </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={40} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
          <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked = {numberAllowed} id='numberInput' onChange={() => {setNumberAllowed((prev) => !prev); }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked = {charAllowed} id='charInput' onChange={() => {setCharAllowed((prev) => !prev); }} />
          <label htmlFor="charInput">Character</label>
        </div>

      </div>
    </div>
    <div class="flex justify-center items-center"> 
      <h1 className='mt-5 mb-8 text-blue-800 text-center my-4 text-2xl'>Don't think about strong passwords anymore, just let this task to be done by our website.</h1>
    </div>
    </div>          
    </>
  )
}

export default App
