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
      let bienvenida = `👑 *¡Bienvenido a ${groupMetadata.subject}!* \n\n${taguser}, disfruta tu estadía en el grupo.\n\n Ya somos〘${participants.length}〙 Miembros.\n\n ${global.welcom1}\n\n> Usa *#help* para ver los comandos disponibles.\n https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `┏━━━━━━━━━━━━━┓\n`        ┃  *¡Adiós, ${taguser}!* \n`
  ┣━━━━━━━━━━━━━┛\n`
  ┃ Grupo: 『${groupMetadata.subject}』\n`
  ┃ Ahora quedamos *${participants.length}* miembros.\n`
  ┗━━━━━━━━━━━━━✦\n\n`
  ` ${global.welcom2}\n\n`
 ` https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb``
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}