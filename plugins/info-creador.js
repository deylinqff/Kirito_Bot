import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) {
    let ownerNumber = '50488198573'; // Número del creador
    let ownerJid = `${ownerNumber}@s.whatsapp.net`;

    let name = '👑 Deylin'; // Nombre del creador
    let packname = 'Kirito Bot'; // Nombre del bot
    let dev = 'By Deylin'; // Desarrollador
    let channel = 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m'; // URL
    let banner = 'https://files.catbox.moe/vtsk5v.jpg'; // Imagen

    let bio = (await conn.fetchStatus(ownerJid).catch(_ => 'Sin Biografía')).status || 'Sin Biografía';
    let ppUrl = await conn.profilePictureUrl(ownerJid).catch(_ => banner);

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;${name};;;
FN:${name}
ORG:${packname}
TEL;waid=${ownerNumber}:${PhoneNumber('+' + ownerNumber).getNumber('international')}
EMAIL:darel0954@gmail.com
ADR:;;🇭🇳 Honduras;;;;
URL:${channel}
NOTE:${bio}
END:VCARD`.trim();

    conn.sendMessage(m.chat, {
        contacts: {
            displayName: name,
            contacts: [{ vcard, displayName: name }]
        },
        contextInfo: {
            forwardingScore: 2023,
            isForwarded: false,
                title: packname, 
                body: dev, 
                sourceUrl: channel,
                thumbnail: ppUrl,
                mediaType: 1,
                showAdAttribution: true, 
                renderLargerThumbnail: true 
            }
        }
    }, { quoted: m });
}

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|creador|creator|dueño)$/i;

export default handler;

// Código creado por Deyin