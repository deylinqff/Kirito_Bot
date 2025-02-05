function handler(m) {
    try {
        if (!suittag || !packname || !dev || !channel || !banner) {
            return conn.reply(m.chat, '❌ Faltan datos en la configuración.', m);
        }

        let name = conn.getName(`${suittag}@s.whatsapp.net`);
        let ownerN = `${suittag}`;

        // Enviar mensaje previo
        let mensaje = `🤖 *Información del dueño*\n\n👤 *Nombre:* ${name}\n📞 *Número:* wa.me/${ownerN}\n🌟 *Bot oficial de ${packname}*`;
        conn.reply(m.chat, mensaje, m);

        // Enviar contacto
        conn.sendContact(
            m.chat,
            [[`${ownerN}@s.whatsapp.net`, `${name}`]],
            m,
            {
                contextInfo: {
                    forwardingScore: 2023,
                    isForwarded: false,
                    externalAdReply: {
                        title: packname,
                        body: dev,
                        sourceUrl: channel,
                        thumbnail: banner,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true,
                    },
                },
            },
            { quoted: m }
        );
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, '❌ Ocurrió un error al ejecutar el comando.', m);
    }
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;