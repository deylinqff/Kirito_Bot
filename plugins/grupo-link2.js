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
  const message = "〔👑 *KIRITO-BOT* 👑〕\n\n*Enlace recibido correctamente. Intentando salir...*";

  try {
    // Unirse temporalmente para poder salir
    await conn.groupAcceptInvite(groupId);
    
    // Salirse del grupo
    await conn.groupLeave(groupId);

    // Envía un mensaje de confirmación
    await conn.sendMessage(m.chat, { text: message });
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

handler.help = ['link2'];
handler.tags = ['enlace2'];
handler.command = ['link2'];
export default handler;