import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL


function Register({ onPageChange }) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        setLoading(true)

        try {

            const userRegister = await axios.post(`${BASE_URL}/api/auth/register`, {
                username: username,
                email: email,
                password: password
            })

            onPageChange("login")

        } catch (error) {
            setError("Kayit Basarisiz")
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
                        Kayıt Ol
                    </CardTitle>
                    <p className="text-white/40 text-sm text-center">
                        Hesap oluştur, çevirmeye başla
                    </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
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
                        onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <Button
                        onClick={handleRegister}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                    >
                        {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
                    </Button>
                    <p className="text-white/40 text-sm text-center">
                        Zaten hesabın var mı?{" "}
                        <button
                            onClick={() => onPageChange("login")}
                            className="text-blue-400 hover:text-blue-300"
                        >
                            Giriş Yap
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register