let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `
╔═❖ EQUIPO DE AYUDANTES ❖═╗
╠ 📌 Dueño: ${creador}
╠ 🤖 Bot: ${botname}
╠ ⚜️ Versión: ${vs}
╠ 📚 Librería: ${libreria} ${baileys}
╚══════════════════════╝

🌟 𝗖𝗥𝗘𝗔𝗗𝗢𝗥
━━━━━━━━━━━━━━━
👑 *𝑫𝒆𝒚𝒍𝒊𝒏*
⚡ *Rol:* Creador
🌟*Number:* wa.me/+50488198573
👾 *GitHub:* https://github.com/deylinqff

💠 𝗖𝗢𝗟𝗔𝗕𝗢𝗥𝗔𝗗𝗢𝗥𝗘𝗦
━━━━━━━━━━━━━━━
🪄 *Davidius⁩*
🔖 *Rol:* Developer
🌟 *Number:* wa.me/+595975677765

🪄 *Jose*
🔖 *Rol:* Developer
🌟 *Number:* wa.me/+5217641291269


━━━━━━━━━━━━━━━
🔥 ¡Gracias por apoyar el proyecto! 🔥`
await conn.sendFile(m.chat, img, 'yuki.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
/*externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: packname,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: icono
}}*/
}
}, { mentions: m.sender })
m.react(emoji)

}
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler