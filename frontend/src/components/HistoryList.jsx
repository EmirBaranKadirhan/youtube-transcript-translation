import React from 'react'

function HistoryList({ history, onSelect }) {

  if (history.length === 0) {
    return (
      <p className="text-white/30 text-sm text-center mt-4">
        Henüz çeviri yapılmadı
      </p>
    )
  }

  console.log(history)

  return (
    <div className="flex flex-col gap-2">
      {history.map((item) => (
        <button

          key={item._id}
          onClick={() => onSelect({
            transcript: {               // ResultCard yapisinin anlayabilecegi sekile cevirdik
              title: item.title,
              translation: item.translatedText,
              summary: item.summarizedText
            }
          })}
          className="text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
        >
          <p className="text-white/80 text-sm font-medium truncate">{item.title}</p>
          <p className="text-white/30 text-xs mt-1 truncate">{item.summarizedText?.slice(0, 60)}...</p>
        </button>
      ))}
    </div>
  )
}

export default HistoryList