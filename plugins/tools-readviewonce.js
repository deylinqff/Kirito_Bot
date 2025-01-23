// Código creado por Deyin
let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    try {
        if (!m.quoted) return conn.reply(m.chat, `🖼️ Responde a una imagen ViewOnce.`, m);
        if (m.quoted.mtype !== 'viewOnceMessageV2') return conn.reply(m.chat, `🖼️ Responde a una imagen ViewOnce.`, m);

        let msg = m.quoted.message;
        let type = Object.keys(msg)[0];
        if (!msg[type]) return conn.reply(m.chat, `❌ No se encontró contenido válido en el mensaje.`, m);

        let media = await downloadContentFromMessage(msg[type], /image/.test(type) ? 'image' : 'video');
        let buffer = Buffer.concat([]);
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (/video/.test(type)) {
            await conn.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m);
        } else if (/image/.test(type)) {
            await conn.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m);
        } else {
            conn.reply(m.chat, `❌ Tipo de archivo no soportado.`, m);
        }
    } catch (err) {
        console.error(err);
        conn.reply(m.chat, `⚠️ Error al procesar el mensaje: ${err.message}`, m);
    }
};

handler.help = ['ver'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'read', 'ver', 'readvo'];
handler.register = true;

export default handler;