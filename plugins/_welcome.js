import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import fs from 'fs'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/bgtoel.jpg';
  
  if (chat.welcome) {
    let img, isBot = who.includes(':'); 
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

    // Generador de imágenes personalizadas (API externa)
    let welcomeImageURL = `https://api.example.com/generate?text=Bienvenido%20${encodeURIComponent(taguser)}`;
    let goodbyeImageURL = `https://api.example.com/generate?text=Adios%20${encodeURIComponent(taguser)}`;

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        if (isBot) {
            await conn.groupParticipantsUpdate(m.chat, [who], 'remove'); // Expulsa bots
            return;
        }

        let welcomeMessages = [
            `👑 ¡𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨/𝐚 ${taguser} a ${groupMetadata.subject}! 🎉`,
            `✨ ${taguser}, disfruta tu estadía en ${groupMetadata.subject}. 🏡`,
            `🎊 ¡Hola ${taguser}! Te uniste a ${groupMetadata.subject}, ¡esperamos que la pases bien!`
        ];

        let bienvenida = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        await conn.sendMessage(m.chat, { image: { url: welcomeImageURL }, caption: bienvenida, mentions: [who] });

        let stickerWelcome = './stickers/welcome.webp';
        if (fs.existsSync(stickerWelcome)) {
            await conn.sendMessage(m.chat, { sticker: fs.readFileSync(stickerWelcome) });
        }

        let reglasGrupo = `📜 *Reglas del grupo* 📜\n1️⃣ No spam\n2️⃣ Respeto a los miembros\n3️⃣ No contenido inapropiado\n...\n🔹 Usa *#help* para ver los comandos disponibles.`;
        await conn.sendMessage(who, { text: reglasGrupo });

        await conn.sendMessage(m.chat, { react: { text: '👍', key: m.key } });

    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
        let goodbyeMessages = [
            `😢 ${taguser} decidió abandonar ${groupMetadata.subject}. ¡Que te vaya bien!`,
            `🚪 ${taguser} se fue de ${groupMetadata.subject}. ¿Volverá algún día?`,
            `👋 Adiós, ${taguser}. Gracias por estar en ${groupMetadata.subject}.`
        ];

        let bye = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];
        await conn.sendMessage(m.chat, { image: { url: goodbyeImageURL }, caption: bye, mentions: [who] });

        let stickerGoodbye = './stickers/bye.webp';
        if (fs.existsSync(stickerGoodbye)) {
            await conn.sendMessage(m.chat, { sticker: fs.readFileSync(stickerGoodbye) });
        }

        await conn.sendMessage(m.chat, { react: { text: '👋', key: m.key } });
    }
  }

  return true;
}