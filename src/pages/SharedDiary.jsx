
import React, { useEffect, useState } from 'react'
import { addEntry, listEntries } from '../api/diary'

export default function SharedDiary(){
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [items, setItems] = useState([])

  const load = async ()=> setItems(await listEntries())
  useEffect(()=>{ load() }, [])

  const add = async () => {
    await addEntry(title, content)
    setTitle(''); setContent('')
    await load()
  }

  return (
    <div className="space-y-3">
      <h2 className="font-serif text-2xl">Shared Diary</h2>
      <input className="w-full p-3 rounded-2xl bg-white/10" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full p-3 rounded-2xl bg-white/10" placeholder="Write your entry…" value={content} onChange={e=>setContent(e.target.value)} />
      <button className="btn btn-primary" onClick={add}>Add entry</button>

      <div className="space-y-2 pt-4">
        {items.map(i=>(
          <div key={i.id} className="card rounded-3xl p-3">
            <div className="text-sm opacity-70">{new Date(i.created_at).toLocaleString()}</div>
            <div className="font-semibold">{i.title}</div>
            <div className="opacity-90">{i.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
