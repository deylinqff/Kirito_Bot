import axios from 'axios'
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import("@whiskeysockets/baileys")).default

let handler = async (message, { conn, text }) => {
  if (!text) return conn.reply(message.chat, '『 🔎 』 Por favor, ingrese lo que desea buscar en TikTok.', message)

  try {
    await message.react('⏳') 
    conn.reply(message.chat, '『 ⇓⇓ 』 Descargando su video, espere un momento...', message)

    let { data: response } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`)
    
    if (!response.data || response.data.length === 0) {
      return conn.reply(message.chat, '『 ⚠️ 』 No se encontraron resultados.', message)
    }

    let searchResults = response.data.slice(0, 5) // Limitar a 5 resultados

    let results = await Promise.all(searchResults.map(async result => {
      let videoMessage = await generateWAMessageContent({ video: { url: result.nowm } }, { upload: conn.waUploadToServer })
      return {
        header: proto.Message.InteractiveMessage.Header.create({ title: result.title, hasMediaAttachment: true, videoMessage }),
        body: proto.Message.InteractiveMessage.Body.create({ text: '『 🔎 』 Resultado de TikTok' }),
        footer: proto.Message.InteractiveMessage.Footer.create({ text: '★ 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 ★' })
      }
    }))

    let responseMessage = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({ text: '『 ➥ 』 Resultado de: ' + text }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '★ 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 ★' }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({ cards: results })
          })
        }
      }
    }, { quoted: message })

    await message.react('✅')
    await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id })

  } catch (error) {
    await conn.reply(message.chat, '『 ❌ 』 Error: ' + error.message, message)
  }
}

handler.help = ['tiktoksearch <txt>']
handler.tags = ['buscador']
handler.command = ['tiktoksearch', 'ttss', 'tiktoks']
export default handler