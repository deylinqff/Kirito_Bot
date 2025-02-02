import axios from 'axios'
import { proto, generateWAMessageFromContent, generateWAMessageContent } from "@whiskeysockets/baileys"

let handler = async (message, { conn, text }) => {
    if (!text) return conn.reply(message.chat, '『 🔎 』 Por favor, ingrese lo que desea buscar en TikTok.', message)

    async function createVideoMessage(url) {
        const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer })
        return videoMessage
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
    }

    try {
        conn.reply(message.chat, '『 ⇓⇓ 』 Descargando su video, espere un momento...', message)

        let { data: response } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`)
        let searchResults = response.data

        if (!searchResults.length) throw new Error('No se encontraron resultados.')

        shuffleArray(searchResults)
        let selectedResults = searchResults.slice(0, 7)

        let results = []
        for (let result of selectedResults) {
            results.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: 'Kirito-Bot' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: result.title,
                    hasMediaAttachment: true,
                    videoMessage: await createVideoMessage(result.nowm)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
            })
        }

        const responseMessage = generateWAMessageFromContent(message.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: `『 ➥ 』 Resultado de: ${text}` }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '★᭄ꦿ𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: results })
                    })
                }
            }
        }, { quoted: message })

        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id })
    } catch (error) {
        await conn.reply(message.chat, `❌ Error: ${error.message}`, message)
    }
}

handler.help = ['tiktoksearch <texto>']
handler.coin = 1
handler.register = true
handler.tags = ['buscador']
handler.command = ['tiktoksearch', 'ttss', 'tiktoks']

export default handler