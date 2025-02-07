import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/56el7x.jpg';

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `╔═══════⩽✰⩾═══════╗
║           𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎
╠═══════⩽✰⩾═══════╝
║╭──────────────┄
║│ *user* : ${taguser} 
║│ *Grupo* : ${groupMetadata.subject}
║╰──────────────┄
╚═══════⩽✰⩾═══════╝`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `╔═══════⩽✰⩾═══════╗
║                 𝐁 𝐀 𝐘
╠═══════⩽✰⩾═══════╝
║╭──────────────┄
║│ *user* : ${taguser}
║│ *Grupo* : ${groupMetadata.subject}
║╰──────────────┄
╚═══════⩽✰⩾═══════╝`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}