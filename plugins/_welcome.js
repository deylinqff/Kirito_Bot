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
      let bienvenida = `╭━━━━━━━━━━━━━━━━━✦\n +
                 │ ⚔️ *¡BIENVENIDO, ESPADACHÍN!* ⚔️\n +
                 │ 🏰 *Reino:* 『${groupMetadata.subject}』\n +
                 │ 👤 *Guerrero:* ${taguser}\n +
                 │ ⚡ *Fuerza del Gremio:* ${participants.length} miembros\n +
                 ╰━━━━━━━━━━━━━━━━━✦\n\n +
                 🖤 *"El mundo no es justo, pero tú decides cómo luchar."* - Kirito\n\n +
                 💠 ${global.welcom1}\n\n +
                 🗡️ *Usa:* #help para conocer tus habilidades.\n +
                 🔗 *Únete a la batalla:* https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`

await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] });
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `⚡ *${taguser} ha salido de ${groupMetadata.subject}.*\n\n Sólo quedamos〘 ${participants.length} 〙Miembros.\n\n${global.welcom2}\n\n👻 ¡Esperamos verte de nuevo!\n https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}