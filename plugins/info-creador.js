import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  m.react('👑')

  // Verifica si el mensaje menciona a alguien, de lo contrario, usa el emisor del mensaje
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

  // URL de la imagen proporcionada
  let imageURL = 'https://files.catbox.moe/li13c2.jpg'

  // Obtener biografía de la persona y el bot
  let biografia = await conn.fetchStatus('50488198573' + '@s.whatsapp.net').catch(_ => 'Sin Biografía')
  let biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}` + '@s.whatsapp.net').catch(_ => 'Sin Biografía')

  // Extrae la biografía o usa un valor por defecto si no existe
  let bio = biografia.status?.toString() || 'Sin Biografía'
  let biobot = biografiaBot.status?.toString() || 'Sin Biografía'

  // Obtener nombre del contacto mencionado
  let name = await conn.getName(who)

  // Definir variables para el propietario y el bot
  let nomorown = '50488198573' // Número del propietario
  let dev = 'Deyin' // Nombre del propietario

  // Definir el texto del mensaje principal
  let caption = `
👑 *Información del Creador y Bot* 👑
----------------------------------------
*👤 Propietario:* ${dev}
*📞 Contacto:* +${nomorown}
*🌎 Región:* Honduras 🇭🇳
*📧 Email:* Deylibaqudano40@gmail.com
*🔗 GitHub:* https://github.com/deylinqff

🤖 *Información del Bot* 🤖
*📛 Nombre:* ${packname || 'Kirito Bot'}
*🌍 Región:* Colombia 🇨🇴
*📧 Email:* moisesmusic04@gmail.com
*🔗 GitHub:* https://github.com/deylinqff/Kirito_Bot
`.trim()

  // Enviar la imagen con el texto principal y los contactos como un solo mensaje
  await conn.sendMessage(m.chat, {
    image: { url: imageURL },
    caption: caption,
    footer: "Deyin ❤️",
    contacts: [
      [`${nomorown}`, `👑 Propietario`, `🚀 𝑫𝒆𝒚𝒍𝒊𝒏`, dev, 'Deylibaqudano40@gmail.com', ` 𝑯𝒐𝒏𝒅𝒖𝒓𝒂𝒔 🇭🇳`, `https://github.com/deylinqff`, bio],
      [`${conn.user.jid.split('@')[0]}`, `Es Un Bot ⚡`, `${packname || 'Kirito Bot'}`, `📵 No Hacer Spam`, 'moisesmusic04@gmail.com', `🇨🇴 Colombia`, `https://github.com/deylinqff/Kirito_Bot`, biobot]
    ]
  }, { quoted: m })
}

handler.help = ["creador", "owner"]
handler.tags = ["info"]
handler.command = ['creador', 'owner']

export default handler