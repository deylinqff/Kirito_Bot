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
      let bienvenida = `✰ *𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨* 𝐀 ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom1}\n ʕ•ᴥ•ʔ 𝐃𝐢𝐬𝐟𝐫𝐢𝐭𝐚 𝐭𝐮 𝐞𝐬𝐭𝐚𝐝𝐢𝐚 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨!\n> ✎ 𝑷𝒖𝒆𝒅𝒆𝒔 𝒖𝒔𝒂𝒓 *#help* 𝒑𝒂𝒓𝒂 𝒗𝒆𝒓 𝒍𝒂 𝒍𝒊𝒔𝒕𝒂 𝒅𝒆 𝒄𝒐𝒎𝒂𝒎𝒅𝒐𝒔.\n https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `✰ *𝐀𝐃𝐈𝐎𝐒* 𝐃𝐄 ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom2}\n ʕ•ᴥ•ʔ 𝐓𝐄 𝐄𝐒𝐏𝐄𝐑𝐀𝐌𝐎𝐒 𝐏𝐑𝐎𝐍𝐓𝐎!\n> ✎ 𝑷𝒖𝒆𝒅𝒆𝒔 𝒖𝒔𝒂𝒓 *#help* 𝒑𝒂𝒓𝒂 𝒗𝒆𝒓 𝒍𝒂 𝒍𝒊𝒔𝒕𝒂 𝒅𝒆 𝒄𝒐𝒎𝒂𝒎𝒅𝒐𝒔.\n https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}