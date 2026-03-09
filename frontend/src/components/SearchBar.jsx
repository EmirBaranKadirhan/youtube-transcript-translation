import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


function Searchbar({ onSubmit, loading }) {
    const [videoUrl, setVideoUrl] = useState("");


    const handleClick = () => {
        // Boş input kontrolü
        if (!videoUrl.trim()) return        // return ile hata varsa fonksiyondan hemen cikilir
        onSubmit(videoUrl)
    }
    return (
        <div className="flex gap-3 w-full max-w-2xl mx-auto">
            <Input
                type="text"
                placeholder="YouTube linki girin... (örn: https://youtube.com/watch?v=...)"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                // Enter tuşuna basınca da çalışsın
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-400"
            />
            <Button
                onClick={handleClick}
                // loading true iken buton devre dışı
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 shrink-0"
            >
                {loading ? "Yükleniyor..." : "Çevir ve Özetle"}
            </Button>
        </div>
    )
}

export default Searchbar