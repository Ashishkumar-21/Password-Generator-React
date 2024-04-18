import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {

  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //ref hook
const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed)str+="!@#%?*!@#%&!@#&"

    for(let index = 1; index<=length; index++){
      let char = Math.floor(Math.random()*str.length)
      pass+= str[char]
    }

    setPassword(pass)

  }, [length, numberAllowed,charAllowed,setPassword])


  const copypasswordtoclipboard = useCallback((e)=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,30)
    window.navigator.clipboard.writeText(password)
    alert("Password copied to clipboard")
  },[password])


  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-10 my-20 text-blue-300 bg-gray-700'>
        <h1 className='pb-3 text-3xl text-center text-white mb-5'
        >
        Password Generator</h1>
        <div className='flex shadow-lg rounded-lg overflow-hidden mb-6'>
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder='Password'
            readOnly
            //referance
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-500 hover:bg-orange-300 text-white px-3 py-1.5 shrink-0'
          onClick={copypasswordtoclipboard}>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-7 py-3 px-6'>
          <div className='flex items-center gap-x-1 '>
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              
              className='cursor-pointer accent-white'
              onChange={(e)=>setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                    console.log("Clicked")
                    setNumberAllowed((prev) => !prev);
                }}
            />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                    setCharAllowed((prev) => !prev )
                }}
            />
            <label htmlFor="characterInput">Special char</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
