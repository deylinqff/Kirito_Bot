let handler = async (m, { conn, command, usedPrefix }) => {
    let img = './src/catalogo.jpg' // Asegúrate de que la imagen existe en esta ruta

    let staff = `╔═❖ *EQUIPO DE AYUDANTES* ❖═╗
╠ 📌 *Dueño:* ${global.creador || 'Desconocido'}
╠ 🤖 *Bot:* ${global.botname || 'Bot'}
╠ ⚜️ *Versión:* ${global.vs || '1.0'}
╠ 📚 *Librería:* ${global.libreria || 'Baileys'} ${global.baileys || ''}
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

    try {
        await conn.sendFile(m.chat, img, 'equipo.jpg', staff.trim(), m, {
            contextInfo: {
                forwardingScore: 200,
                isForwarded: false,
            }
        }, { mentions: [m.sender] })  

        await m.react('✅') // Reacciona con un emoji de confirmación

    } catch (error) {
        console.error('Error enviando el mensaje:', error)
        await m.reply('❌ *Ocurrió un error al enviar la información del equipo.*')
    }
}

handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler