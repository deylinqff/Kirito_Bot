export async function before(m, { conn, participants, groupMetadata }) {
    const fkontak = { key: { fromMe: false, participant: '0@s.whatsapp.net' }, message: { conversation: '¡KIRITO-BOT!' } };

    if (!m.messageStubType || !m.isGroup) return true;

    let userId = m.messageStubParameters[0];

    const welcomeImage = 'https://qu.ax/SuZFt.jpg'; // Imagen de bienvenida
    const goodbyeImage = 'https://qu.ax/jqiVK.jpg'; // Imagen de despedida

    let pp;
    try {
        pp = await conn.profilePictureUrl(userId, 'image');
    } catch (error) {
        pp = null;
    }

    let img;
    try {
        img = await (await fetch(pp || welcomeImage)).buffer();
    } catch (fetchError) {
        img = await (await fetch(welcomeImage)).buffer();
    }

    let chat = global.db.data.chats[m.chat];

    if (chat.welcome && m.messageStubType === 27) {
        let wel = `〘 𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕 〙\n『 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎 😁 』\n 『 @${userId.split`@`[0]} 』\n    『 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/ 𝐀 』\n   ➥ ${groupMetadata.subject}\n   \n https://chat.whatsapp.com/LmJUVlnRwzJF6GM2KzBIXz`;
        try {
            await conn.sendMini(m.chat, packname, dev, wel, img, img, channel, fkontak);
        } catch (sendError) {
            console.error('Error al enviar mensaje de bienvenida:', sendError);
        }
    }

    // Mensaje de despedida (cuando se sale)
    if (chat.welcome && m.messageStubType === 28) {
        let bye = `〘 𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕 〙 \n「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n 「 @${userId.split`@`[0]} 」\n   𝐁𝐚𝐲 𝐩𝐨𝐫𝐞𝐬𝐨 𝐧𝐢 𝐭𝐮 𝐦𝐚𝐦𝐚́ 𝐭𝐞 𝐪𝐮𝐢𝐞𝐫𝐞\n https://chat.whatsapp.com/LmJUVlnRwzJF6GM2KzBIXz`;
        let img2;
        try {
            img2 = await (await fetch(goodbyeImage)).buffer(); 
            await conn.sendMini(m.chat, packname, dev, bye, img2, img2, channel, fkontak);
        } catch (sendError) {
            console.error('Error al enviar mensaje de despedida:', sendError);
        }
    }

    // Mensaje de expulsión (cuando se echa a alguien)
    if (chat.welcome && m.messageStubType === 32) {
        let kick = `〘 𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕 〙\n「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n 「 @${userId.split`@`[0]} 」\n   𝐁𝐚𝐲 𝐩𝐨𝐫𝐞𝐬𝐨 𝐧𝐢 𝐭𝐮 𝐦𝐚𝐦𝐚́ 𝐭𝐞 𝐪𝐮𝐢𝐞𝐫𝐞\n https://chat.whatsapp.com/LmJUVlnRwzJF6GM2KzBIXz`;
        let img3;
        try {
            img3 = await (await fetch(goodbyeImage)).buffer();
            await conn.sendMini(m.chat, packname, dev, kick, img3, img3, channel, fkontak);
        } catch (sendError) {
            console.error('Error al enviar mensaje de expulsión:', sendError);
        }
    }
}


/*let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://files.catbox.moe/wo866r.m4a';
  let vn2 = 'https://files.catbox.moe/hmuevx.opus';
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

 if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, { audio: { url: vn }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363307382381547@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(ಥ ͜ʖಥ) 𝙒 𝙀 𝙇 𝘾 𝙊 𝙈 𝙀 (◕︿◕✿)`, 
    "body": `${userName}`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, { audio: { url: vn2 }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363322713003916@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(oꆤ︵ꆤo) 𝘼 𝘿 𝙄 𝙊 𝙎 (|||❛︵❛.)`, 
    "body": `${userName}, Soy gay asi que me voy.`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
  }
}*/