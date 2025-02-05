function handler(m) {
    let ownerNumber = '50488198573'; // Número del creador
    let ownerJid = `${ownerNumber}@s.whatsapp.net`;
    let name = '👑 Deylin'; // Nombre del creador
    let packname = 'Kirito Bot'; // Nombre del bot
    let dev = 'By Deylin'; // Desarrollador
    let channel = 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m'; // URL (puede ser de GitHub, YouTube, etc.)
    let banner = 'https://files.catbox.moe/vtsk5v.jpg'; // URL de la imagen grande

    conn.sendContact(m.chat, [[ownerJid, name]], m, {
        contextInfo: { 
            forwardingScore: 2023,
            isForwarded: false, 
            externalAdReply: {  
                title: packname, 
                body: dev, 
                sourceUrl: channel,
                thumbnail: banner,
                thumbnailUrl: banner, 
                mediaType: 1,
                showAdAttribution: true, 
                renderLargerThumbnail: true 
            }
        }
    }, {
        quoted: m
    });
}

handler.help = ['owner'];
handler.tags = ['info'];
handler.command = ['owner', 'creador', 'creator', 'dueño'];

export default handler;