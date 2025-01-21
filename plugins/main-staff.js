import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {

let staff = `
🔔 El staff no está disponible en este momento.  
👨‍💻 Si necesitas ayuda, por favor deja tu mensaje y nos pondremos en contacto contigo lo antes posible.
`.trim();

await conn.sendMessage(m.chat, { 
    text: staff,
    contextInfo: {
      externalAdReply: {
        title: `📢 Notificación del Staff`,
        body: "Staff no disponible",
        thumbnailUrl: "https://qu.ax/CfNcZ.jpg", // Cambia la URL a la imagen que prefieras
        sourceUrl: "https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m", // Cambia el enlace a donde quieras redirigir
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
};

handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler;