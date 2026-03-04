import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ResultCard({ transcriptData }) {

    const { title, translation, summary } = transcriptData.transcript
    console.log(transcriptData)

    const [showFull, setShowFull] = useState(false)

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">

            {/* ÖZET KARTI */}
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-semibold">
                        Özet
                    </p>
                    <p className="text-white/80 leading-relaxed text-sm">{summary}</p>
                </CardContent>
            </Card>

            {/* ÇEVİRİ KARTI */}
            <Card className="bg-white/5 border-white/10">
                <CardContent className="pt-6">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-semibold">
                        Türkçe Çeviri
                    </p>
                    <p className="text-white/80 leading-relaxed text-sm">


                        {showFull ? translation : translation.slice(0, 500) + "..."}
                    </p>
                    <button
                        onClick={() => setShowFull(!showFull)}
                        className="text-blue-400 text-sm mt-3 hover:text-blue-300 transition-colors"
                    >
                        {showFull ? "Daha az goster" : "Tamamini Goster"}
                    </button>
                </CardContent>
            </Card>
        </div>

    )
}

export default ResultCard