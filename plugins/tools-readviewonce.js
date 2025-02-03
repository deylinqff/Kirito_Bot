//Este si es para el whatsapp actualizado💁🏻‍♂️

const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

const handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, 'Responde a una imagen ViewOnce.', m)
  if (m.quoted.mtype !== 'viewOnceMessage') return conn.reply(m.chat, 'Responde a una imagen ViewOnce.', m)

  const msg = m.quoted.message
  const type = Object.keys(msg)[0]
  const media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video')

  if (!media) return conn.reply(m.chat, 'Error al descargar el archivo.', m)

  const buffer = Buffer.from([])
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk])
  }

  switch (type) {
    case 'imageMessage':
      return conn.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m)
    case 'videoMessage':
      return conn.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m)
    default:
      return conn.reply(m.chat, 'Tipo de archivo no soportado.', m)
  }
}

handler.help = ['ver']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'ver', 'readvo']
handler.limit = 1
handler.register = true

module.exports = handler