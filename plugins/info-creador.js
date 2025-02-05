import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) {
    let ownerNumber = '50488198573';
    let ownerJid = `${ownerNumber}@s.whatsapp.net`;

    let name = '👑 Deylin ⚡';

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;${name};;;
FN:${name}
TEL;waid=${ownerNumber}:${PhoneNumber('+' + ownerNumber).getNumber('international')}
END:VCARD`.trim();

    conn.sendMessage(m.chat, {
        contacts: {
            displayName: name,
            contacts: [{ vcard, displayName: name }]
        }
    }, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;

// Código creado por Deyin