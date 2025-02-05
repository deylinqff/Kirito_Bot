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
        let bienvenida = `👑 𝐇𝐨𝐥𝐚,${taguser} ¡𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨/𝐀 \n ${groupMetadata.subject} \n 𝐃𝐢𝐬𝐟𝐫𝐮𝐭𝐚 𝐭𝐮 𝐞𝐬𝐭𝐚𝐝𝐢𝐚 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.\n\n ${global.welcom1}\n\n> 𝑼𝒔𝒂 *#help* 𝒑𝒂𝒓𝒂 𝒗𝒆𝒓 𝒍𝒐𝒔 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒅𝒊𝒔𝒑𝒐𝒏𝒊𝒃𝒍𝒆𝒔.\n https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
        let bye = `⚡ *${taguser} ha salido de ${groupMetadata.subject}.*\n\n ${global.welcom2}\n\n👻 ¡Esperamos verte de nuevo!\n https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}