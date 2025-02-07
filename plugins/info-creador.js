import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) {
    let numcreador = '50488198573'; // Número del creador
    let ownerJid = `${numcreador}@s.whatsapp.net`;

    let name = conn.getName(ownerJid) || 'Creador';

    // Crear vCard
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;${name};;;
FN:${name}
TEL;waid=${numcreador}:${PhoneNumber('+' + numcreador).getNumber('international')}
END:VCARD`.trim();

    // Enviar el contacto con vCard
    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: name,
            contacts: [{ vcard, displayName: name }]
        }
    }, { quoted: m });

    // Enviar el contacto con sendContact
    await conn.sendContact(m.chat, [[ownerJid, name]], m);
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;

// Código creado por Deyin