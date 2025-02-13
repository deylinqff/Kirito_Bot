import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/22mlg6.jpg')
  let bio = '😿 Es privada'
  let biografia = await conn.fetchStatus(m.sender).catch(() => null)
  if (biografia && biografia[0]?.status) {
    bio = biografia[0].status
  }

  if (user.registered) {
    return m.reply(`『 ✎ 』 *YA ESTÁS REGISTRADO.*\n\n*¿QUIERES HACERLO DE NUEVO?*\n\n> Usa este comando para eliminar tu registro:\n*${usedPrefix}unreg*`)
  }
  
  if (!Reg.test(text)) throw `*『✦』Formato incorrecto.*\n\n#reg *Nombre.edad*\n\nEjemplo:\n#reg *${name2}.18*`
  let [_, name, , age] = text.match(Reg)
  if (!name) throw '*『✦』El nombre es obligatorio.*'
  if (!age) throw '*『✦』La edad es obligatoria.*'
  
  age = parseInt(age)
  if (age > 10000) throw '*『😏』Viejo/a Sabroso/a*'
  if (age < 5) throw '*『🍼』Ven aquí, ¡te adoptaré!*'

  user.name = name.trim()
  user.age = age
  user.descripcion = bio
  user.regTime = +new Date
  user.registered = true

  global.db.data.users[m.sender].money += 600
  global.db.data.users[m.sender].dragones += 10
  global.db.data.users[m.sender].exp += 245
  global.db.data.users[m.sender].joincount += 5

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)        

  let regbot = `👤 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗢 👤
⌬━━━━▣━━◤◢━━▣━━━━━⌬
「👑」𝗡𝗼𝗺𝗯𝗿𝗲: ${name}
「⭐」𝗘𝗱𝗮𝗱: ${age} años
⌬━━━━▣━━◤◢━━▣━━━━━⌬
「🎁」𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:
• 600 monedas 💰
• 10 Dragones 🐉
• 245 Experiencia ✨
• 5 Invitaciones 📨
⌬━━━━▣━━◤◢━━▣━━━━━⌬
𝑻𝑬𝑪𝑵𝑶-𝑩𝑶𝑻©®`

  // Botón para el menú
  let buttons = [
    { buttonId: '.menu', buttonText: { displayText: '📜 Menú Principal' }, type: 1 }
  ]

  let buttonMessage = {
    image: { url: perfil },
    caption: regbot,
    footer: '𝑻𝑬𝑪𝑵𝑶-𝑩𝑶𝑻©®',
    buttons: buttons,
    headerType: 4
  }

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler