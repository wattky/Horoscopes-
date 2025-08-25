
import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Star, Moon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white px-6">
      <div className="text-center space-y-6">
        <div className="flex justify-center space-x-3 text-fuchsia-400">
          <Moon size={48} />
          <Star size={48} />
          <Sparkles size={48} />
        </div>

        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl opacity-80">
          Oops... This constellation doesn’t exist ✨
        </p>

        <p className="opacity-60">
          You may have drifted into a cosmic void. Let’s guide you back to your horoscope destiny 🌌
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
