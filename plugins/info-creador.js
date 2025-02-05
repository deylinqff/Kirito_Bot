import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
    let ownerNumber = '50488198573';
    let ownerJid = `${ownerNumber}@s.whatsapp.net`;

    let name = '👑 Deylin';

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;${name};;;
FN:${name}
TEL;waid=${ownerNumber}:${new PhoneNumber('+' + ownerNumber).getNumber('international')}
END:VCARD`.trim();

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: name,
            contacts: [{ vcard, displayName: name }]
        }
    }, { quoted: m });
};

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|creador|creator|dueño)$/i;

export default handler; // Si tu bot usa CommonJS, cambia esto a module.exports = handler;

// Código creado por Deyin