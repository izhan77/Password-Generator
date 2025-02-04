import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  //useRef hook
  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false),2000);
  }, [password])


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789"
    if (char) str += "!@#$%^&*()+_-=[]{}`~/?><.,"
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length,number,char,setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length,number,char,passwordGenerator])

  return (
    <>
      <h1 className="text-4xl text-white py-5 font-bold text-center my-8">Password Generator</h1>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-orange-500 bg-gray-800">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" 
          value={password}
          className="outline-none w-full py-3 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          />

          <button 
          onClick={copyPasswordToClipBoard}
          className="bg-blue-500 px-3 text-white font-semibold hover:bg-blue-600">copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked = {number}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
            className="cursor-pointer"
            />
            <label htmlFor="numberInput">Numbers</label>
            
            <input 
            type="checkbox"
            defaultChecked = {char}
            id="charInput"
            onChange={() => {
              setChar((prev) => !prev);
            }}
            className="cursor-pointer"
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>

      </div>

      {copied && <div className="text-white text-center rounded-full justify-center flex flex-wrap px-2 py-2">Copied!</div>}      
    </>    
  )
}

export default App
