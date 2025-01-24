// Código creado por Deyin
export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (!m.isGroup) return;

    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    let bot = global.db.data.settings[this.user.jid] || {};
    if (m.fromMe) return true;

    // Define el número del creador
    const creatorNumber = '50488198573@s.whatsapp.net'; // Sustituye por el número de tu creador en formato WhatsApp

    // Verificar si el mensaje menciona al creador
    if (m.mentionedJid && m.mentionedJid.includes(creatorNumber)) {
        await conn.sendMessage(m.chat, {
            image: { url: 'https://files.catbox.moe/li13c2.jpg' }, // Cambia el enlace por el de tu imagen
            caption: `✨ *Kirito-Bot* ✨\n\n⚙️ _powered by Deylin_\n\nLo siento, no puedo proporcionar información sobre mi creador.`,
            footer: 'github.com',
            buttons: [
                {
                    buttonId: 'id-ver-canal',
                    buttonText: { displayText: '🌐 Ver canal' },
                    type: 1,
                },
            ],
            headerType: 4, // Tipo de mensaje con imagen
        });
        return;
    }

    // Detectar mensajes específicos y ejecutar acciones
    if (m.id.startsWith('3EB0') && m.id.length === 22) {
        if (chat.antiBot) {
            if (isBotAdmin) {
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
        }
    }
}