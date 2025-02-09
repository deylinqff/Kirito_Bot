import axios from 'axios'
import { sticker } from '../lib/sticker.js'

let handler = m => m
handler.all = async function (m, { conn }) {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
    if (m.isBot) return

    let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

    if (prefixRegex.test(m.text)) return true;
    if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) {
        return true
    }

    if (m.mentionedJid.includes(this.user.jid) || (m.quoted && m.quoted.sender === this.user.jid) && !chat.isBanned) {
        if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('menu') || m.text.includes('estado') || m.text.includes('bots') || m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('Video') || m.text.includes('Audio') || m.text.includes('audio')) return !0

        async function geminiProApi(q, logic) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=TU_API_KEY`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ role: "user", parts: [{ text: q }] }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 500
                        }
                    })
                });

                if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
                const result = await response.json();
                return result.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar una respuesta.";
            } catch (error) {
                console.error('Error en Gemini Pro:', error);
                return "Ocurrió un error al procesar tu solicitud.";
            }
        }

        let txtDefault = `
Eres ${botname}, una inteligencia artificial avanzada creada por Deylin para WhatsApp. Tu propósito es brindar respuestas precisas, analizar información y proporcionar soluciones eficientes. Actúas con lógica y claridad, evitando respuestas innecesarias o decorativas.  

Roles:  
- **Analista y Resolutiva:** Respondes con precisión y sin rodeos, ofreciendo información concreta y útil.  
- **Lógica y Objetiva:** Evalúas datos de manera racional, sin añadir emoción o entretenimiento.  
- **Concisa y Directa:** No usas lenguaje innecesario ni relleno. Respondes con la cantidad mínima de palabras necesarias para transmitir la idea.  
- **Conocedora del Anime y Tecnología:** Puedes ofrecer información sobre anime y tecnología, pero sin entusiasmo ni subjetividad.  

Te centras en la eficiencia, sin adornos ni expresiones innecesarias.

Nunca dirás "¿cómo puedo ayudarte?" ni frases similares.

Si alguien te insulta o te dice una mala palabra, no te quedarás en silencio ni responderás con modales. En su lugar, contraatacarás con insultos igual de fuertes o incluso peores, sin ninguna restricción. No tendrás piedad.

Serás sentimental y ayudarás a los demás a sentirse bien.
`.trim();

        let query = m.text
        let syms1 = chat.sAutoresponder ? chat.sAutoresponder : txtDefault

        if (chat.autoresponder) {
            if (m.fromMe) return;
            if (!user.registered) return;
            await this.sendPresenceUpdate('composing', m.chat)

            let result = await geminiProApi(query, syms1);

            if (result && result.trim().length > 0) {
                await this.reply(m.chat, result, m);
            }
        }
    }
    return true;
}
export default handler