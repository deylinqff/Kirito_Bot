import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]

  let welcomeImage = 'https://files.catbox.moe/bgtoel.jpg' // Imagen de bienvenida
  let goodbyeImage = 'https://files.catbox.moe/mmfl7k.jpg' // Imagen de despedida

  if (chat.welcome) {
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `👑 *¡Bienvenido a ${groupMetadata.subject}!* \n\n⚡ ${taguser}, disfruta tu estadía en el grupo. \n\n ✎ https://chat.whatsapp.com/LmJUVlnRwzJF6GM2KzBIXz`
      let img = await (await fetch(welcomeImage)).buffer()
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
      
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `⚡ *${taguser} ha salido de\n ${groupMetadata.subject}.*\n\n 🖕 ¡Esperamos no verte de nuevo!\n\n ✎ https://chat.whatsapp.com/LmJUVlnRwzJF6GM2KzBIXz`
      let img = await (await fetch(goodbyeImage)).buffer()
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}