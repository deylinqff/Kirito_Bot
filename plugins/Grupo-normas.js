// Créditos A Deylin
let handler = async (m, { conn, isBotAdmin }) => {
  // No Quites Los Créditos🚀
  m.react('⚙️');

  try {
    // Verificar si el bot tiene permisos de administrador
    if (!isBotAdmin) {
      await conn.sendMessage(m.chat, { text: '⚠️ *No puedo salir del grupo porque no soy administrador.*' });
      return;
    }

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
  } catch (error) {
    console.error('Error al salir del grupo:', error);
    await conn.sendMessage(m.chat, { text: '❌ *Hubo un error al intentar salir del grupo.*' });
  }
};

// Configuración para que el código siempre esté activo
Object.defineProperty(handler, 'alwaysOn', {
  value: true,
  writable: false,
});

handler.help = ['reportar'];
handler.tags = ['grupo'];
handler.command = ['reportar'];
handler.group = true; // Solo se ejecuta en grupos
handler.botAdmin = true; // El bot debe ser admin para salir
export default handler;