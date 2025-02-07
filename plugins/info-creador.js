function handler(m) {
let name = conn.getName(`${numcreador}@s.whatsapp.net`)
let ownerN = `${numcreador}`
conn.sendContact(m.chat, [[`${ownerN}@s.whatsapp.net`, `${name}`]], m, {
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