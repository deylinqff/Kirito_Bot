async function handler(m) {
    try {
        if (!suittag || !packname || !dev || !channel) {
            return conn.reply(m.chat, '❌ Faltan datos en la configuración.', m);
        }

        let ownerN = `${suittag}`;
        let name = await conn.getName(`${ownerN}@s.whatsapp.net`);
        let ppUrl;

        try {
            ppUrl = await conn.profilePictureUrl(`${ownerN}@s.whatsapp.net`, 'image');
        } catch {
            ppUrl = 'https://telegra.ph/file/7c0b1e3d8b8a5a3b3b3b3.jpg'; // Imagen de respaldo si no hay foto de perfil
        }

        await conn.reply(m.chat, mensaje, m);

        // Enviar contacto con imagen de perfil
        await conn.sendContact(
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
                        thumbnail: ppUrl,  // Se usa la foto de perfil
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