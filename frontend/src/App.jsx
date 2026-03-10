import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import axios from 'axios';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import Login from './components/Login';
import Register from './components/Register';
import { DoorClosed } from 'lucide-react'
import { Spinner } from "@/components/ui/spinner"
const BASE_URL = import.meta.env.VITE_API_URL


function App() {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [history, setHistory] = useState([])
  const [page, setPage] = useState("login")


  useEffect(() => {
    if (page === "home") {
      fetchHistory()
    }
  }, [page])

  const fetchHistory = async () => {

    setLoading(true)
    const token = localStorage.getItem("token")
    try {
      const response = await axios.get(`${BASE_URL}/api/transcript/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setHistory(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  const handleSubmit = async (videoUrl) => {

    setLoading(true)
    const token = localStorage.getItem("token")
    try {
      // axios ile backend'e istek at
      const response = await axios.post(`${BASE_URL}/api/transcript/get-transcript`, {
        videoUrl: videoUrl        // body'e videoUrl seklinde gonderiyoruz, controller tarafinda gonderileni aliyoruz !
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // gelen veriyi setResult'a ver
      setResult(response.data)
      console.log(response.data)

      setError(null)
      fetchHistory()        // Yeni çeviri sonrası history'yi güncelle

    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
      console.log(error)

    } finally {
      setLoading(false)
    }

  }

  const handleLogout = () => {

    localStorage.removeItem("token");
    setPage("login")
  }

  if (page === "login") {
    return <Login onPageChange={(page) => setPage(page)} />
  }

  if (page === "register") {
    return <Register onPageChange={(page) => setPage(page)} />
  }

  return (

    <div className="min-h-screen bg-[#0a0f1e] flex font-sans">

      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
      >
        <DoorClosed strokeWidth={2.5} size={32} />
      </button>

      <aside className="w-80 border-r border-white/10 p-6 flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-white/50 text-xs font-semibold uppercase tracking-widest">
          Geçmiş Çeviriler
        </h2>
        <HistoryList history={history} onSelect={setResult} />
      </aside>

      <main className="flex-1 p-10 flex flex-col gap-8 overflow-y-auto">


        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            YouTube <span className="text-blue-400">Çevirici</span>
          </h1>
          <p className="text-white/40 mt-2 text-sm">
            YouTube videolarını Türkçeye çevir ve özetle
          </p>
        </div>


        <SearchBar onSubmit={handleSubmit} loading={loading} />


        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}


        {loading ? (
          <div className="text-white text-center flex justify-center items-center h-40"><Spinner className="size-8" /></div>
        ) : (
          result && <ResultCard transcriptData={result} />
        )}
      </main>
    </div>
  )
}

export default App
