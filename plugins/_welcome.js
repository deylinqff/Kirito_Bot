import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

    let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg';

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

  if (chat.welcome) {
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `👑 *¡Bienvenido a ${groupMetadata.subject}!* ⚡\n\n ${taguser}, disfruta tu estadía en el grupo.\n ${global.welcom1}\n\n> Usa *#help* para ver los comandos disponibles.\n https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
      let img = await (await fetch(welcomeImage)).buffer()
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
      
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `⚡ *${taguser} ha salido de ${groupMetadata.subject}.*\n\n${global.welcom2}\n\n👻 ¡Esperamos verte de nuevo!\n https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
      let img = await (await fetch(goodbyeImage)).buffer()
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}