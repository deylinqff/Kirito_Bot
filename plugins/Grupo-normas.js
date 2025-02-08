// Créditos A Deylin
let handler = async (m, { conn, isBotAdmin }) => {
  // No Quites Los Créditos🚀
  m.react('⚙️');

  // Almacén de infracciones por grupo (esto se puede usar en una base de datos)
  const groupInfractions = {};

  // Palabras clave no permitidas en los mensajes
  const bannedWords = ['maldito', 'spam', 'enlace', 'infracción'];  // Agrega las palabras que consideres inapropiadas
  const groupLinkPattern = /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/; // Patrón para detectar enlaces de grupo

  try {
    // Verificar si el bot tiene permisos de administrador
    if (!isBotAdmin) {
      await conn.sendMessage(m.chat, { text: '⚠️ *No puedo salir del grupo porque no soy administrador.*' });
      return;
    }

    // Obtener la información del grupo
    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupId = groupMetadata.id;
    let groupName = groupMetadata.subject;

    // Verificar si el mensaje contiene una palabra o enlace prohibido
    const messageText = m.text.toLowerCase();
    const containsBannedWord = bannedWords.some(word => messageText.includes(word));
    const containsGroupLink = groupLinkPattern.test(m.text);

    // Si el mensaje contiene una infracción
    if (containsBannedWord || containsGroupLink) {
      // Si no se ha creado el contador de infracciones para este grupo, lo inicializamos
      if (!groupInfractions[groupId]) {
        groupInfractions[groupId] = 0;
      }

      // Incrementar el contador de infracciones
      groupInfractions[groupId]++;

      // Si el grupo ha alcanzado 10 infracciones
      if (groupInfractions[groupId] >= 10) {
        // Enviar mensaje de advertencia
        let warningMessage = `🚨 *ALERTA DE INCUMPLIMIENTO* 🚨\n\n` +
          `Este grupo ha alcanzado el límite de infracciones permitidas.\n\n` +
          `🔹 *Grupo:* ${groupName}\n` +
          `⚠️ *El bot procederá a retirarse del grupo.*`;

        await conn.sendMessage(m.chat, { text: warningMessage });

        // Enviar reporte al número de soporte
        let reportMessage = `🚨 *REPORTE DE INCUMPLIMIENTO* 🚨\n\n` +
          `🔹 *Grupo:* ${groupName}\n` +
          `🔹 *ID:* ${groupId}\n` +
          `❗ Este grupo ha alcanzado 10 infracciones.\n\n` +
          `⚠️ *El bot ha salido del grupo.*`;

        let adminNumber = '50488198573@s.whatsapp.net'; // Número de soporte
        await conn.sendMessage(adminNumber, { text: reportMessage });

        // Salir del grupo
        await conn.groupLeave(groupId);

        // Limpiar las infracciones del grupo (para no seguir contando después de salir)
        delete groupInfractions[groupId];
      } else {
        // Si el grupo tiene menos de 10 infracciones, simplemente notificar al grupo
        let warningMessage = `⚠️ *Infracción detectada en el grupo*:\n\n` +
          `Se ha detectado un incumplimiento de las políticas. Te quedan ${10 - groupInfractions[groupId]} faltas antes de que el bot abandone el grupo.`;

        await conn.sendMessage(m.chat, { text: warningMessage });
      }
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