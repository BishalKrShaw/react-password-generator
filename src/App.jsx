
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null);

  // Function to generate password
  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "`~!@#$%^&*()-_=+[{]}|,<.>/?;:'";

    for(let i=1; i<length; i++) {
      let char = Math.floor(Math.random()*str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed])

  // Copy Password to clipboard
  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  // Execute the passwordGenerator function
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className='container'>
        <div className='pg-container'>
          <h1>Password Generator</h1>
          <div className='input-container'>
            <input 
              type='text'
              value={password}
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />
            <button onClick={copyPasswordToClipboard}>Copy</button>
          </div>
          <div className='controller-container'>
            <div className='range-container'>
              <label>Length: {length}</label>
              <input 
                type='range'
                min={4}
                max={32}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className='check-container'>
              <input 
                type='checkbox'
                id='num'
                defaultChecked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor='num'>Number</label>
            </div>
            <div className='check-container'>
              <input 
                type='checkbox'
                id='char'
                defaultChecked={numberAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor='char'>Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
