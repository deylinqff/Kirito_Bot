import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
    let ownerNumber = '50488198573'; // Número del creador
    let ownerJid = `${ownerNumber}@s.whatsapp.net`;

    // Imagen predefinida en caso de error
    let defaultImage = 'https://files.catbox.moe/tm6axp.jpg';

    let name = await conn.getName(ownerJid);
    let ppUrl = await conn.profilePictureUrl(ownerJid).catch(_ => defaultImage);
    let bio = (await conn.fetchStatus(ownerJid).catch(_ => 'Sin Biografía')).status || 'Sin Biografía';

    await sendContactArray(conn, m.chat, [
        [`${ownerNumber}`, `👑 Propietario`, `𝑫𝒆𝒚𝒍𝒊𝒏`, 'Desarrollador', 'deylibaquedano801@gmail.com', `🇭🇳 Honduras`, `https://github.com/deylinqff/Kirito_Bot`, bio]
    ], m, { thumbnail: ppUrl });
};

handler.help = ["creador", "owner"];
handler.tags = ["info"];
handler.command = /^(owner|creador)$/i;

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
        },
        ...options
    },
    { quoted });
}