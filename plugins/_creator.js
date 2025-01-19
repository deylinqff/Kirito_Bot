// Código creado por Deyin
export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (!m.isGroup) return;

    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    let bot = global.db.data.settings[this.user.jid] || {};
    if (m.fromMe) return true;

    // Define el prefijo y número del creador
    const creatorPrefix = 'Creador'; // Cambia 'Creador' por el prefijo que prefieras
    const creatorNumber = '50488198573@s.whatsapp.net'; // Sustituye por el número de tu creador en formato WhatsApp

    // Verificar si el mensaje contiene el prefijo o el número del creador
    if (
        (m.text && m.text.includes(creatorPrefix)) ||
        (m.text && m.text.includes(creatorNumber))
    ) {
        await conn.sendMessage(m.chat, { text: 'Lo siento, no puedo proporcionar información sobre mi creador.' });
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