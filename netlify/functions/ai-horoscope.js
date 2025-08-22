import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const { sign, question } = body
  if (!sign || !question) {
    return { statusCode: 400, body: 'Missing sign or question' }
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an astrology assistant." },
        { role: "user", content: `Give me a horoscope for ${sign} about: ${question}` }
      ]
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ result: response.choices[0].message.content })
    }
  } catch (err) {
    return { statusCode: 500, body: 'OpenAI error: ' + err.message }
  }
}
