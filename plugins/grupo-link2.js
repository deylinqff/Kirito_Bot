// Créditos A Deylin
let handler = async (m, { conn, text }) => {
  // No Quites Los Créditos🚀
  m.react('⚙️');

  // Verifica si el mensaje contiene un enlace de grupo de WhatsApp
  const groupLinkPattern = /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/;
  const match = text.match(groupLinkPattern);

  if (!match) {
    await conn.sendMessage(m.chat, { text: '❌ *No enviaste un enlace válido de grupo de WhatsApp.*' });
    return;
  }

  const inviteCode = match[1];

  try {
    // Obtener la información del grupo usando el código de invitación
    let groupInfo = await conn.groupGetInviteInfo(inviteCode);
    let groupId = groupInfo.id;

    // Verificar si el bot está en el grupo
    let isInGroup = Object.keys(await conn.groupFetchAllParticipating()).includes(groupId);

    if (!isInGroup) {
      await conn.sendMessage(m.chat, { text: '❌ *No estoy en ese grupo.*' });
      return;
    }

    // Salirse del grupo
    await conn.groupLeave(groupId);
    await conn.sendMessage(m.chat, { text: `✅ *Me he salido del grupo ${groupInfo.subject} exitosamente.*` });
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

handler.help = ['salir'];
handler.tags = ['grupo'];
handler.command = ['salir'];
export default handler;