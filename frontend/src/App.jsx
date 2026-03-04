import React, { useEffect, useState } from 'react'
import Searchbar from './components/Searchbar'
import axios from 'axios';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';

function App() {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [history, setHistory] = useState([])


  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {

    try {
      const response = await axios.get("http://localhost:5000/api/transcript/history");
      setHistory(response.data);
    } catch (error) {
      console.log(error)
    }

  }

  const handleSubmit = async (videoUrl) => {

    setLoading(true)
    try {
      // axios ile backend'e istek at
      const response = await axios.post("http://localhost:5000/api/transcript/get-transcript", {
        videoUrl: videoUrl        // body'e videoUrl seklinde gonderiyoruz, controller tarafinda gonderileni aliyoruz !
      })

      // gelen veriyi setResult'a ver
      setResult(response.data)
      console.log(response.data)

      fetchHistory()        // Yeni çeviri sonrası history'yi güncelle

    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
      console.log(error)

    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="min-h-screen bg-[#0a0f1e] flex font-sans">

      {/* SOL SIDEBAR — History */}
      <aside className="w-80 border-r border-white/10 p-6 flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-white/50 text-xs font-semibold uppercase tracking-widest">
          Geçmiş Çeviriler
        </h2>
        <HistoryList history={history} onSelect={setResult} />
      </aside>

      {/* SAĞ TARAF — Ana içerik */}
      <main className="flex-1 p-10 flex flex-col gap-8 overflow-y-auto">

        {/* BAŞLIK */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            YouTube <span className="text-blue-400">Çevirici</span>
          </h1>
          <p className="text-white/40 mt-2 text-sm">
            YouTube videolarını Türkçeye çevir ve özetle
          </p>
        </div>

        {/* ARAMA */}
        <Searchbar onSubmit={handleSubmit} loading={loading} />

        {/* HATA MESAJI */}
        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}

        {/* SONUÇ */}
        {result && <ResultCard transcriptData={result} />}
      </main>
    </div>
  )
}

export default App
