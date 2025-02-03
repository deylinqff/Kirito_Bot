import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/bgtoel.jpg';

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `👑 *¡𝔹𝕚𝕖𝕟𝕧𝕖𝕟𝕚𝕕𝕠 𝕒 ${groupMetadata.subject}!* \𝕟\𝕟${taguser}, 𝕕𝕚𝕤𝕗𝕣𝕦𝕥𝕒 𝕥𝕦 𝕖𝕤𝕥𝕒𝕕í𝕒 𝕖𝕟 𝕖𝕝 𝕘𝕣𝕦𝕡𝕠.\𝕟\𝕟 𝕐𝕒 𝕤𝕠𝕞𝕠𝕤〘${participants.length} 〙 𝕄𝕚𝕖𝕞𝕓𝕣𝕠𝕤.\𝕟\𝕟 ${global.welcom1}\n\n> 𝕌𝕤𝕒 *#𝕙𝕖𝕝𝕡* 𝕡𝕒𝕣𝕒 𝕧𝕖𝕣 𝕝𝕠𝕤 𝕔𝕠𝕞𝕒𝕟𝕕𝕠𝕤 𝕕𝕚𝕤𝕡𝕠𝕟𝕚𝕓𝕝𝕖𝕤.\𝕟 https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb `
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `⚡ *${taguser} ha salido de ${groupMetadata.subject}.*\n\n Sólo quedamos〘 ${participants.length} 〙Miembros.\n\n${global.welcom2}\n\n👻 ¡Esperamos verte de nuevo!\n https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}