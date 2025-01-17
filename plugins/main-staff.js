import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {

let staff = `
✨ *EQUIPO DE AYUDANTES* ✨
👑 *Dueño* ${creador}
🍬 *Bot:* ${botname}
⚜️ *Versión:* ${vs}
📚 *Libreria:* ${libreria} ${baileys}

🪐 *Creador:*

☁️ 𝑫𝒆𝒚𝒍𝒊𝒏
🔖 *Rol:* Creador
👾 *GitHub:* https://github.com/deylinqff

🍃 *Colaboradores:*

🫧 no hay 
🔖 *Rol:* Developer
👾 *GitHub:* 

🍍 no hay 
🔖 *Rol:* Developer
👾 *GitHub:* 
⚡ no hay 
🔖 *Rol:* Developer
👾 *GitHub:* 

🌪️ no hay 
🔖 *Rol:* Moderador 
👾 *GitHub:* `.trim();

await conn.sendMessage(m.chat, { 
    text: staff,
    contextInfo: {
      externalAdReply: {
        title: `✨ Developers`,
        body: dev,
        thumbnailUrl: catalogo,
        sourceUrl: channel,
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

export default handler
