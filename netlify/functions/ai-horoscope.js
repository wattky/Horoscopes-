import fetch from 'node-fetch';

export async function handler(event) {
  const { sign, lang } = JSON.parse(event.body);

  const systemPrompts = {
    en: "You are a mystical horoscope AI. Write in poetic yet clear English.",
    cs: "Jsi mystická AI pro horoskopy. Piš česky, poeticky a srozumitelně.",
    sk: "Si mystická AI pre horoskopy. Píš po slovensky, poeticky a zrozumiteľne.",
    pl: "Jesteś mistyczną AI od horoskopów. Pisz po polsku, poetycko i zrozumiale.",
    hu: "Te egy misztikus horoszkóp AI vagy. Írj magyarul, költőien és érthetően."
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.AI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompts[lang] || systemPrompts["en"] },
        { role: "user", content: `Napiš dnešní horoskop pro znamení ${sign}.` }
      ],
      max_tokens: 1500,
      temperature: 0.9
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ result: data.choices[0].message.content })
  };
}
