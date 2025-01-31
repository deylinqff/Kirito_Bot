import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/bgtoel.jpg');
  let img = await (await fetch(`${pp}`)).buffer();
  let chat = global.db.data.chats[m.chat];

  const audioUrl = 'https://files.catbox.moe/mmfl7k.jpg';

  if (chat.bienvenida && m.messageStubType == 27) {
    if (chat.sWelcome) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`;
      let welcome = chat.sWelcome
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, welcome, img, img, canal);
    } else {
      let bienvenida = `┌─✦ 𝑲𝑰𝑹𝑰𝑻𝑶☆𝑩𝑶𝑻 \n│「 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 」\n└┬✎ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✎  𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 𝑨\n   │✎  ${groupMetadata.subject}\n   └───────────────┈ ⳹\n> 𝒖𝒏𝒆𝒕𝒆 𝒂𝒎𝒊 𝑪𝒐𝒎𝒖𝒏𝒊𝒅𝒂𝒅 https://chat.whatsapp.com/LmJUVlnRwzJF6GM2KzBIXz`;
      await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img);
    }
    // Enviar el audio después del mensaje de bienvenida
    await conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mp4' });
  }

  if (chat.bienvenida && m.messageStubType == 28) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`;
      let bye = chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, bye, img, img);
    } else {
      let bye = `┌─✦ 𝑲𝑰𝑹𝑰𝑻𝑶☆𝑩𝑶𝑻  \n│「 BAYY 👋 」\n└┬✎ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✎  𝐁𝐚𝐲 𝐩𝐨𝐫𝐞𝐬𝐨 𝐧𝐢 𝐭𝐮 𝐦𝐚𝐦𝐚́ 𝐭𝐞 𝐪𝐮𝐢𝐞𝐫𝐞 \n └───────────────┈ ⳹\nhttps://chat.whatsapp.com/LmJUVlnRwzJF6GM2KzBIXz`;
      await conn.sendAi(m.chat, botname, textbot, bye, img, img);
    }
  }

  if (chat.bienvenida && m.messageStubType == 32) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`;
      let bye = chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, bye, img, img);
    } else {
      let kick = `┌─✦ 𝑲𝑰𝑹𝑰𝑻𝑶☆𝑩𝑶𝑻  \n│「 BAYY 👋 」\n└┬✎ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✎  𝐁𝐚𝐲 𝐩𝐨𝐫𝐞𝐬𝐨 𝐧𝐢 𝐭𝐮 𝐦𝐚𝐦𝐚́ 𝐭𝐞 𝐪𝐮𝐢𝐞𝐫𝐞 \n  └───────────────┈ ⳹\nhttps://chat.whatsapp.com/LmJUVlnRwzJF6GM2KzBIXz`;
      await conn.sendAi(m.chat, botname, textbot, kick, img, img);
    }
  }
}