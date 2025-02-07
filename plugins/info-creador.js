import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) {
    let numcreador = '50488198573'; // Número del creador
    let ownerJid = `${numcreador}@s.whatsapp.net`;

    let name = conn.getName(ownerJid) || 'Deylin';

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
TEL;waid=${numcreador}:${PhoneNumber('+' + numcreador).getNumber('international')}
END:VCARD`.trim();

    await conn.sendMessage(m.chat, { 
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