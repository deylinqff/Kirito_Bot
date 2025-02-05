import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) {
    let ownerNumber = '50488198573'; // Número del creador
    let ownerJid = `${ownerNumber}@s.whatsapp.net`;

    let name = '👑 Deylin'; // Nombre del creador

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

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|creador|creator|dueño)$/i;

export default handler;

// Código creado por Deyin