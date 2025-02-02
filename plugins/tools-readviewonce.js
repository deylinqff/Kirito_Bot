import { downloadMediaMessage } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
if (!m.quoted) return conn.reply(m.chat, `🖼️ Responde a una imagen ViewOnce.`, m)
if (m.quoted.mtype !== 'viewOnceMessageV2') return conn.reply(m.chat, `🖼️ Responde a una imagen ViewOnce.`, m)

let buffer = await downloadMediaMessage(m.quoted, 'buffer')
if (!buffer) return conn.reply(m.chat, '❌ No se pudo descargar el archivo.', m)

let type = m.quoted.message.imageMessage ? 'image' : 'video'
let fileName = type === 'image' ? 'media.jpg' : 'media.mp4'

conn.sendFile(m.chat, buffer, fileName, m.quoted.message[type + 'Message']?.caption || '', m)
}

handler.help = ['ver']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'ver', 'readvo'] 
handler.register = true 

export default handler