import React, { useState } from 'react'
import Searchbar from './components/Searchbar'
import axios from 'axios';
import ResultCard from './components/ResultCard';

function App() {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, serError] = useState(null);

  const handleSubmit = async (videoUrl) => {

    setLoading(true)
    try {
      // axios ile backend'e istek at
      const response = await axios.post("http://localhost:5000/api/transcript/get-transcript", {
        videoUrl: videoUrl        // body'e videoUrl seklinde gonderiyoruz, controller tarafinda gonderileni aliyoruz !
      })

      setResult(response.data)
      console.log(response.data)

      // gelen veriyi setResult'a ver

      setLoading(false)
    } catch (error) {

      console.log(error)
    }

  }

  return (

    <div>
      <Searchbar onSubmit={handleSubmit} />
      {result && <ResultCard transcriptData={result} />}

    </div>
  )
}

export default App
