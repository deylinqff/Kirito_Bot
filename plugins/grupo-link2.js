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

  const groupId = match[1];

  try {
    // Obtiene la lista de grupos del bot
    let groups = await conn.groupFetchAllParticipating();
    let groupToLeave = Object.values(groups).find(g => g.id.includes(groupId));

    if (!groupToLeave) {
      await conn.sendMessage(m.chat, { text: '❌ *No estoy en ese grupo.*' });
      return;
    }

    // Salirse del grupo
    await conn.groupLeave(groupToLeave.id);
    await conn.sendMessage(m.chat, { text: `✅ *Me he salido del grupo exitosamente.*` });
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