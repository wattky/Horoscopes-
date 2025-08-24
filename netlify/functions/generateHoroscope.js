
export default async (req, context) => {
  try{
    const { sign='Aries', lang='en' } = await req.json()
    const apiKey = process.env.OPENAI_API_KEY
    if(!apiKey){
      return new Response(JSON.stringify({ text: `${sign}: (local) Love flows. Choose tenderness today.` }), { status: 200 })
    }
    const prompt = `Write an 80-100 word daily love horoscope. language=${lang}, sign=${sign}. Tone: poetic, optimistic, practical.`
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type':'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role:'user', content: prompt }], temperature: 0.8 })
    })
    const j = await r.json()
    const text = j.choices?.[0]?.message?.content?.trim() || `${sign}: Love flows.`
    return new Response(JSON.stringify({ text }), { status: 200 })
  }catch(e){
    return new Response(JSON.stringify({ error: 'failed' }), { status: 200 })
  }
}
