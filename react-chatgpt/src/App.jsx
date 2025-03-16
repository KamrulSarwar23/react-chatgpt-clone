
import { useState } from 'react'
import './App.css'
import { URL } from './constants';

function App() {

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(undefined);

  const payload = {
    "contents": [{
    "parts":[{"text": question}]
    }]
  }

  const handleQuestion = async () => {
      let response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(payload)
      })

      response = await response.json();
      setAnswer(response.candidates[0].content.parts[0].text)
  }

  return (
   <div className='grid grid-cols-5 h-screen text-center'>
      <div className='col-span-1 bg-zinc-700 h-screen'>

      </div>

      <div className='col-span-4 bg-zinc-800 h-screen'>
        <div className='container h-150 overflow-scroll text-white mt-3 px-5'>
            {answer}
        </div>
        <div className='flex bg-zinc-700 w-1/2 m-auto text-white rounded-4xl border border-zinc-500 mt-4'>
          <input value={question} onChange={(event) => setQuestion(event.target.value)} className='w-full h-full p-3 outline-none' type="text" placeholder='Ask me anything'/>
          <button onClick={()=> handleQuestion()} className='mr-5 cursor-pointer'>Ask</button>
        </div>

      </div>
   </div>
  )
}

export default App
