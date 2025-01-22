import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
  let staff = `
🌌 *EQUIPO DE DESARROLLO - KIRITO BOT* 🌌
  
👑 *Dueño y Fundador:*  
  ☁️ Deylin  
  📞 *WhatsApp:* wa.me/1234567890
  🔗 [GitHub](https://github.com/deylinqff)   

🛠️ *ayudantes:*  

  ⚡ Emma Violets  
  📞 *WhatsApp:* wa.me/0987654321
  
  🍍 Niño Piña  
  🔗 [GitHub](https://github.com/WillZek)  
  📞 *WhatsApp:* wa.me/1122334455
  
  
⚙️ *Información Técnica:*  
  🔖 *Versión:* ${vs}  
  📚 *Librería:* ${libreria} ${baileys}  
  🤖 *Bot:* ${botname}

✨ Gracias por confiar en nosotros. ¡Estamos aquí para mejorar tu experiencia!
  `.trim();

  await conn.sendMessage(m.chat, { 
    text: staff,
    contextInfo: {
      externalAdReply: {
        title: `🌌 Equipo de Desarrollo 🌌`,
        body: `Kirito Bot - Siempre contigo.`,
        thumbnailUrl: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4', // Cambia esto por tu URL de imagen
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      },
    },
  }, { quoted: m });
};

handler.help = ['staff'];
handler.tags = ['main'];
handler.command = ['ayudantes', 'colaboradores', 'staff'];

export default handler;