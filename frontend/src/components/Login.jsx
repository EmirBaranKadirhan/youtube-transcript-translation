import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'

function Login({ onPageChange }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {

        setLoading(true)

        try {

            const userLogin = await axios.post("https://youtube-transcript-translation.onrender.com/api/auth/login", {
                email: email,
                password: password
            })

            const { token } = userLogin.data

            localStorage.setItem("token", token)
            onPageChange("home");                        // app.jsx de duruma gore sayfayi degistirmesini saglar !!
        } catch (error) {
            setError("Email veya şifre hatalı")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
            <Card className="bg-white/5 border-white/10 w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-white text-2xl text-center">
                        Giriş Yap
                    </CardTitle>
                    <p className="text-white/40 text-sm text-center">
                        YouTube Çevirici'ye hoş geldiniz
                    </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                    <Input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <Button
                        onClick={handleLogin}               // giris yapildiktan sonra buradan da sayfa degistirilir
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                    >
                        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                    </Button>
                    <p className="text-white/40 text-sm text-center">
                        Hesabın yok mu?{" "}
                        <button
                            onClick={() => onPageChange("register")}       // giris yapmadan sayfa degistirme kismi
                            className="text-blue-400 hover:text-blue-300"
                        >
                            Kayıt Ol
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login