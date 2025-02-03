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
  let bienvenida = `┏━━━━━━━━━━━━━┓\n`
  bienvenida += `┃  *¡Bienvenido!* ┃\n`
  bienvenida += `┣━━━━━━━━━━━━━┛\n`
  bienvenida += `┃ Usuario: ${taguser}\n`
  bienvenida += `┃ Grupo: 『${groupMetadata.subject}』\n`
  bienvenida += `┃ Ahora somos *${participants.length}* miembros.\n`
  bienvenida += `┗━━━━━━━━━━━━━✦\n\n`
  bienvenida += ` ${global.welcom1}\n\n`
  bienvenida += ` https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
  
  await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
} else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
  let bye = `┏━━━━━━━━━━━━━┓\n`
  bye += `┃  *¡Adiós, ${taguser}!* \n`
  bye += `┣━━━━━━━━━━━━━┛\n`
  bye += `┃ Grupo: 『${groupMetadata.subject}』\n`
  bye += `┃ Ahora quedamos *${participants.length}* miembros.\n`
  bye += `┗━━━━━━━━━━━━━✦\n\n`
  bye += ` ${global.welcom2}\n\n`
  bye += ` https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
  
  await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
}