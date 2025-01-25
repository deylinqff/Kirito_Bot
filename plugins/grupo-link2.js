// Créditos A Deylin
let handler = async (m, { conn, text, isOwner }) => {
  // No Quites Los Créditos🚀
  m.react('⚙️');

  // Verifica si el usuario es el owner del bot
  if (!isOwner) {
    await conn.sendMessage(m.chat, { text: '❌ *Este comando solo está disponible para el owner del bot.*' });
    return;
  }

  // Verifica si el mensaje contiene un enlace de grupo de WhatsApp
  const groupLinkPattern = /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/;
  const match = text.match(groupLinkPattern);

  if (!match) {
    await conn.sendMessage(m.chat, { text: '❌ *No enviaste un enlace válido de grupo de WhatsApp.*' });
    return;
  }

  const groupId = match[1];
  const message = "〔👑 *𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕* 👑〕\n\n*Enlace recibido correctamente.*";

  try {
    // Acepta la invitación al grupo
    await conn.groupAcceptInvite(groupId);

    // Envía un mensaje de confirmación
    await conn.sendMessage(m.chat, { text: message });
  } catch (error) {
    console.error('Error al aceptar el enlace del grupo:', error);
    await conn.sendMessage(m.chat, { text: '❌ *Hubo un error al intentar unirse al grupo.*' });
  }
};

// Configuración para que el código siempre esté activo
Object.defineProperty(handler, 'alwaysOn', {
  value: true, // Indica que el handler está siempre activo
  writable: false, // Protege esta propiedad contra modificaciones
});

handler.help = ['link2'];
handler.tags = ['owner'];
handler.command = ['.link2', 'owner'];
handler.rowner = true; // Solo disponible para el dueño del bot

module.exports = handler;