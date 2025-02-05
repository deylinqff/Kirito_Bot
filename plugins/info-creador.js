import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) {
    let ownerNumber = '50488198573'; // Número del creador (sin @s.whatsapp.net)
    let ownerJid = `${ownerNumber}@s.whatsapp.net`;

    let name = '👑 Deylin'; // Nombre del creador
    let packname = 'Kirito Bot'; // Nombre del bot
    let dev = 'By Deylin'; // Desarrollador
    let channel = 'https://github.com/deylinqff/Kirito_Bot'; // URL
    let banner = 'https://files.catbox.moe/tm6axp.jpg'; // Imagen
    let bio = (await conn.fetchStatus(ownerJid).catch(_ => 'Sin Biografía')).status || 'Sin Biografía';
    let ppUrl = await conn.profilePictureUrl(ownerJid).catch(_ => banner);

    await sendContactArray(conn, m.chat, [
        [`${ownerNumber}`, `👑 Propietario`, packname, dev, 'darel0954@gmail.com', `🇭🇳 Honduras`, channel, bio]
    ], m, { thumbnail: ppUrl });

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

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|creador|creator|dueño)$/i;

export default handler;

async function sendContactArray(conn, jid, data, quoted, options) {
    if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];

    let contacts = [];
    for (let [number, name, title, role, email, region, website, bio] of data) {
        number = number.replace(/[^0-9]/g, '');
        let njid = number + '@s.whatsapp.net';

        let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${title}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${role}
item2.EMAIL;type=INTERNET:${email}
item2.X-ABLabel:📧 Email
item3.ADR:;;${region};;;;
item3.X-ABADR:ac
item3.X-ABLabel:🏷 Región
item4.URL:${website}
item4.X-ABLabel:Website
item5.X-ABLabel:${bio}
END:VCARD`.trim();

        contacts.push({ vcard, displayName: name });
    }

    return await conn.sendMessage(jid, {
        contacts: {
            displayName: contacts.length > 1 ? `${contacts.length} contactos` : contacts[0].displayName,
            contacts,
        }
    },
    {
        quoted,
        ...options
    });
}

// Código creado por Deyin