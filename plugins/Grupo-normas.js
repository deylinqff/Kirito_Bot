// Créditos A Deylin
let handler = async (m, { conn, isBotAdmin }) => {
  // No Quites Los Créditos🚀
  m.react('⚙️');

  // Palabras clave no permitidas en los mensajes
  const bannedWords = ['maldito', 'spam', 'enlace', 'infracción'];  // Agrega las palabras que consideres inapropiadas
  const groupLinkPattern = /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/; // Patrón para detectar enlaces de grupo

  try {
    // Verificar si el bot tiene permisos de administrador

    // Verificar si el mensaje contiene una palabra o enlace prohibido
    const messageText = m.text.toLowerCase();
    const containsBannedWord = bannedWords.some(word => messageText.includes(word));
    const containsGroupLink = groupLinkPattern.test(m.text);

    if (containsBannedWord || containsGroupLink) {
      // Obtener información del grupo
      let groupMetadata = await conn.groupMetadata(m.chat);
      let groupId = groupMetadata.id;
      let groupName = groupMetadata.subject;

      // Mensaje de advertencia en el grupo
      let warningMessage = `🚨 *ALERTA DE INCUMPLIMIENTO* 🚨\n\n` +
        `Este grupo ha incumplido nuestras *políticas de privacidad y normativas de uso.*\n\n` +
        `🔹 *Grupo:* ${groupName}\n` +
        `⚠️ *El bot procederá a retirarse del grupo.*`;

      await conn.sendMessage(m.chat, { text: warningMessage });

      // Mensaje de reporte al número de soporte
      let reportMessage = `🚨 *REPORTE DE INCUMPLIMIENTO* 🚨\n\n` +
        `🔹 *Grupo:* ${groupName}\n` +
        `🔹 *ID:* ${groupId}\n` +
        `❗ Se ha detectado una infracción a las políticas del bot.\n\n` +
        `⚠️ *El bot ha salido del grupo.*`;

      let adminNumber = '50488198573@s.whatsapp.net'; // Número de soporte
      await conn.sendMessage(adminNumber, { text: reportMessage });

      // Salir del grupo
      await conn.groupLeave(groupId);
    }
  } catch (error) {
    console.error('Error al detectar infracción:', error);
    await conn.sendMessage(m.chat, { text: '❌ *Hubo un error al intentar monitorear el mensaje.*' });
  }
};

// Configuración para que el código siempre esté activo
Object.defineProperty(handler, 'alwaysOn', {
  value: true,
  writable: false,
});

handler.help = ['detectar'];
handler.tags = ['grupo'];
handler.command = ['detectar'];
handler.group = true; // Solo se ejecuta en grupos
export default handler;