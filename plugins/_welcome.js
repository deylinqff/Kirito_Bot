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
  let bienvenida = `┏━━━━━━━━━━━━━⚔️━━━━━━━━━━━━━⌬
┃   ⚔️ *¡BIENVENIDO, ESPADACHÍN!* ⚔️   
┣━━━━━━━━━━━━━⚔️━━━━━━━━━━━━━⌬
┃ 🏰 *Reino:* 『${groupMetadata.subject}』  
┃ 👤 *Guerrero:* ${taguser}  
┃ ⚡ *Fuerza del Gremio:* ${participants.length} miembros  
┃ 🖤 *"El mundo no es justo, pero tú decides cómo luchar."* - Kirito  
┃ ${global.welcom1}  
┃ 🗡️ *Usa:* #help para conocer tus habilidades. 
┗━━━━━━━━━━━━⚔️━━━━━━━━━━━⌬
🔗 *Únete a la batalla:* https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`;

  await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] });
} else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
  let bye = 
`┏━━━━━━━━━━━━☠️━━━━━━━━━━━━━⌬
┃   ☠️ *¡UN GUERRERO HA CAÍDO!* ☠️   
┣━━━━━━━━━━━━━☠️━━━━━━━━━━━━⌬
┃ 🏰 *Reino:* 『${groupMetadata.subject}』  
┃ 👤 *Guerrero:* ${taguser}  
┃ 📉 *Fuerza del Gremio:* ${participants.length} miembros  
┃ 🖤 *"No importa cuántas veces caigas, lo importante es levantarte."* - Kirito  
┃ ${global.welcom2}  
┗━━━━━━━━━━━━━━━☠️━━━━━━━━━━━⌬
🔗 *Si decides regresar:* https://chat.whatsapp.com/H9Er7VDTtCSGSvGZEUqPVb`;

  await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] });
}