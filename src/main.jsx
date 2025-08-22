
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import * as P from './pages'
function App(){
  return (
    <div className="min-h-screen text-foreground">
      <div className="max-w-md mx-auto p-4">
        <h1 className="font-serif text-3xl mb-4">Cosmic Love — Ultimate</h1>
        <Routes>
          {Object.entries(P).map(([k,Comp])=> <Route key={k} path={`/${k.toLowerCase()}`} element={<Comp/>}/>)}
          <Route path="/" element={<P.Home/>}/>
        </Routes>
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 bg-white/10 rounded-3xl px-4 py-2 text-xs">v5.0.0</div>
      </div>
    </div>
  )
}
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>)
