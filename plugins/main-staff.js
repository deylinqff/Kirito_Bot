let handler = async (m, { conn }) => {
    let img = './src/catalogo.jpg'

    let staff = `╔═❖ *EQUIPO DE AYUDANTES* ❖═╗
╠ 📌 *Dueño:* ${global.creador}
╠ 🤖 *Bot:* ${global.botname}
╠ ⚜️ *Versión:* ${global.vs}
╠ 📚 *Librería:* ${global.libreria} ${global.baileys}
╚══════════════════════╝

🌟 *𝗖𝗥𝗘𝗔𝗗𝗢𝗥*
━━━━━━━━━━━━━━━
👑 *𝑫𝒆𝒚𝒍𝒊𝒏*
⚡ *Rol:* Creador
🌟 *Número:* wa.me/+50488198573
👾 *GitHub:* https://github.com/deylinqff

💠 *𝗖𝗢𝗟𝗔𝗕𝗢𝗥𝗔𝗗𝗢𝗥𝗘𝗦*
━━━━━━━━━━━━━━━
🪄 *Davidius⁩*
🔖 *Rol:* Developer
🌟 *Número:* wa.me/+595975677765

🪄 *Jose*
🔖 *Rol:* Developer
🌟 *Número:* wa.me/+5217641291269

━━━━━━━━━━━━━━━
🔥 ¡Gracias por apoyar el proyecto! 🔥
`

    await conn.sendFile(m.chat, img, 'equipo.jpg', staff.trim(), m, {
        contextInfo: {
            forwardingScore: 200,
            isForwarded: false,
        }
    }, { mentions: [m.sender] })

    await m.react('✅')
}

handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler