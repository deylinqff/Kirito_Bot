// Código creado por Deyin
export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (!m.isGroup) return;

    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    let bot = global.db.data.settings[this.user.jid] || {};
    if (m.fromMe) return true;

    // Verificar si se menciona el prefijo del creador
    const creatorPrefix = 'Creador'; // Cambia 'Creador' por el prefijo que desees
    if (m.text && m.text.includes(creatorPrefix)) {
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