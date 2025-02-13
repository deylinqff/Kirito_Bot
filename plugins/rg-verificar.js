import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
// import _ from "lodash"

let Reg = /\|?(.*)([.|] ?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  // let delirius = await axios.get(https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international')})
  // let paisdata = delirius.data.result
  // let mundo = paisdata ? `${paisdata.name} ${paisdata.emoji}` : 'Desconocido'

  let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/22mlg6.jpg')

  let bio = '😿 Es privada'
  let fechaBio = "Fecha no disponible"
  let biografia = await conn.fetchStatus(m.sender).catch(() => null)

  if (biografia && biografia[0]?.status) {
    bio = biografia[0].status
    fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Fecha no disponible"
  }

  if (user.registered) {
    return m.reply(`『 ✎ 』 *YA ESTÁS REGISTRADO.*\n\n*¿QUIERES HACERLO DE NUEVO?*\n\n> Usa este comando para eliminar tu registro:\n*${usedPrefix}unreg*`)
  }

  if (!Reg.test(text)) throw `*『✦』El comando ingresado es incorrecto, úsalo de la siguiente manera:*\n\n#reg *Nombre.edad*\n\n\`\`\`Ejemplo:\`\`\`\n#reg ${name2}.18`

  let [_, name, , age] = text.match(Reg)
  if (!name) throw '*『✦』No puedes registrarte sin nombre, el nombre es obligatorio. Inténtelo de nuevo.*'
  if (!age) throw '*『✦』No puedes registrarte sin la edad, la edad es obligatoria. Inténtelo de nuevo.*'
  if (name.length >= 30) throw '*『✦』El nombre no debe de tener más de 30 caracteres.*'

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

  // Botón de "📜 Menú Principal"
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

  let chtxt = `✐ *𝚄𝚜𝚎𝚛* » ${m.pushName || 'Anónimo'}
⌨ *𝚅𝚎𝚛𝚒𝚏𝚒𝚌𝚊𝚌𝚒𝚘́𝚗* » ${user.name}
⍰ *𝙴𝚍𝚊𝚍* » ${user.age} años
✐ *𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘𝚗* » ${user.descripcion}
♛ *𝚄𝚕𝚝𝚒𝚖𝚊 𝙼𝚘𝚍𝚒𝚏𝚒𝚌𝚊𝚌𝚒𝚘𝚗* » ${fechaBio}
߷︎ *𝙵𝚎𝚌𝚑𝚊* » ${new Date().toLocaleDateString("es-ES")}
⚡ *𝙽𝚞𝚖𝚎𝚛𝚘 𝚍𝚎 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚘* » ${sn}`

  await conn.sendMessage(global.idchannel, { text: chtxt, contextInfo: {
    externalAdReply: {
      title: "【 🔔 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 🔔 】",
      body: '🥳 ¡𝚄𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚗𝚞𝚎𝚟𝚘 𝚎𝚗 𝚖𝚒 𝚋𝚊𝚜𝚎 𝚍𝚎 𝚍𝚊𝚝𝚘𝚜!',
      thumbnailUrl: perfil,
      sourceUrl: redes,
      mediaType: 1,
      showAdAttribution: false,
      renderLargerThumbnail: false
    }
  }}, { quoted: null })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler