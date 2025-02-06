import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import Jimp from 'jimp'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/56el7x.jpg'
  let botname = 'Kirito Bot'
  let creator = 'Deylin'

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image')
      img = await (await fetch(pp)).buffer()
    } catch {
      img = await (await fetch(defaultImage)).buffer()
    }

    // Cargar imagen y agregar marca de agua
    let image = await Jimp.read(img)
    let font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
    image.print(font, 10, 10, `${botname} - Creado por ${creator}`)
    
    let finalImage = await image.getBufferAsync(Jimp.MIME_JPEG)

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `╔═══════⩽✰⩾═══════╗
║       𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎
╠═══════⩽✰⩾═══════╝
║╭──────────────┄
║│ *user* : ${taguser} 
║│ *Grupo* : ${groupMetadata.subject}
║╰──────────────┄
╚═══════⩽✰⩾═══════╝`
      await conn.sendAi(m.chat, botname, bienvenida, finalImage, finalImage, canal)
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `╔═══════⩽✰⩾═══════╗
║               𝐁𝐀𝐘
╠═══════⩽✰⩾═══════╝
║╭──────────────┄
║│ *user* : ${taguser}
║│ *Grupo* : ${groupMetadata.subject}
║╰──────────────┄
╚═══════⩽✰⩾═══════╝`
      await conn.sendAi(m.chat, botname, bye, finalImage, finalImage, canal)
    }
  }

  return true
}