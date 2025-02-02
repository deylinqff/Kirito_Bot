import { downloadContentFromMessage } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
    if (!m.quoted) return conn.reply(m.chat, `🖼️ Responde a una imagen o video ViewOnce.`, m);
    if (!m.quoted.message.viewOnceMessageV2) return conn.reply(m.chat, `🖼️ Responde a una imagen o video ViewOnce.`, m);

    let msg = m.quoted.message.viewOnceMessageV2.message;
    let type = Object.keys(msg)[0];

    if (!['imageMessage', 'videoMessage'].includes(type)) {
        return conn.reply(m.chat, `🖼️ Responde a una imagen o video ViewOnce.`, m);
    }

    let mediaType = type === 'imageMessage' ? 'image' : 'video';

    try {
        let stream = await downloadContentFromMessage(msg[type], mediaType);
        let buffer = Buffer.concat([]);

        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        let fileName = mediaType === 'image' ? 'media.jpg' : 'media.mp4';
        let caption = msg[type]?.caption || '';

        await conn.sendFile(m.chat, buffer, fileName, caption, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `❌ Error al procesar el archivo.`, m);
    }
};

handler.help = ['ver'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'read', 'ver', 'readvo'];
handler.register = true;

export default handler;