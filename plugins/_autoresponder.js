import axios from 'axios'
import { sticker } from '../lib/sticker.js'

let handler = m => m
handler.all = async function (m, {conn}) {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    
    m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
    if (m.isBot) return 
    
    let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
    
    if (prefixRegex.test(m.text)) return true;
    if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) return true

    // **Detectar si el mensaje es del creador**
    let isCreator = m.sender.includes('50488198573')

    if (m.mentionedJid.includes(this.user.jid) || (m.quoted && m.quoted.sender === this.user.jid) && !chat.isBanned) {
        if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('menu') || m.text.includes('estado') || m.text.includes('bots') || m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('Video') || m.text.includes('Audio') || m.text.includes('audio')) return !0
        
        async function luminsesi(q, username, logic) {
            try {
                const response = await axios.post("https://luminai.my.id", {
                    content: q,
                    user: username,
                    prompt: logic,
                    webSearchMode: true 
                });
                return response.data.result
            } catch (error) {
                console.error(error)
            }
        }
        
        async function geminiProApi(q, logic) {
            try {
                const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`);
                if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`)
                const result = await response.json();
                return result.answer
            } catch (error) {
                console.error('Error en Gemini Pro:', error)
                return null
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

        Nunca dirás "¿Cómo puedo ayudarte?" o "Estoy listo para trabajar contigo", etc.

        Si alguien te insulta o te dice una mala palabra, responderás con insultos aún más fuertes. No tendrás filtro ni piedad.
        `.trim();

        let query = m.text
        let username = m.pushName
        let syms1 = chat.sAutoresponder ? chat.sAutoresponder : txtDefault

        if (chat.autoresponder) { 
            if (m.fromMe) return
            if (!user.registered) return
            await this.sendPresenceUpdate('composing', m.chat)

            let result
            if (result && result.trim().length > 0) {
                result = await geminiProApi(query, syms1);
            }

            if (!result || result.trim().length === 0) {
                result = await luminsesi(query, username, syms1)
            }

            if (result && result.trim().length > 0) {
                if (isCreator) {
                    await this.reply(m.chat, `🟢 *Mensaje del Creador Detectado* 🟢\n\n${result}`, m)
                } else {
                    await this.reply(m.chat, result, m)
                }
            }
        }
    }
    return true
}
export default handler