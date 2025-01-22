import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
  let staff = `
👑 *EQUIPO DE DESARROLLO*

👑 *Dueño y Fundador:*  
☁️ *Deylin*  
📞 *WhatsApp:* wa.me/1234567890  
🔗 (https://github.com/deylinqff)  

🛠️ *Ayudantes:*  

⚡ *Davidius⁩*  
📞 *WhatsApp:* wa.me/+595975677765  

🚀 *Zoe*  
📞 *WhatsApp:* wa.me/+56945882459  

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
        thumbnailUrl: 'logo3.jpg', // Cambia esto por tu URL de imagen
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