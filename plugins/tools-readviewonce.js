import { downloadContentFromMessage } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
    if (!m.quoted) return conn.reply(m.chat, `🖼️ Responde a una imagen ViewOnce.`, m);
    if (!m.quoted.message || !m.quoted.message.viewOnceMessageV2) return conn.reply(m.chat, `🖼️ Responde a una imagen ViewOnce.`, m);

    let msg = m.quoted.message.viewOnceMessageV2.message;
    let type = Object.keys(msg)[0];
    let mediaType = type === 'imageMessage' ? 'image' : 'video';

    try {
        let media = await downloadContentFromMessage(msg[type], mediaType);
        let buffer = Buffer.from([]);

        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        let fileName = mediaType === 'image' ? 'media.jpg' : 'media.mp4';
        let caption = msg[type].caption || '';

        await conn.sendFile(m.chat, buffer, fileName, caption, m);
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, `❌ Error al procesar el archivo.`, m);
    }
};

handler.help = ['ver'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'read', 'ver', 'readvo'];
handler.register = true;

export default handler;