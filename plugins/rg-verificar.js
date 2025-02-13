import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)

    let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/22mlg6.jpg')
    let bio = '😿 Es privada', fechaBio
    let biografia = await conn.fetchStatus(m.sender).catch(() => null)

    if (biografia && biografia[0] && biografia[0].status !== null) {
        bio = biografia[0].status || '😿 Es privada'
        fechaBio = biografia[0].setAt
            ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })
            : "Fecha no disponible"
    }

    if (user.registered) {
        return m.reply(`『 ✎ 』 *YA ESTÁS REGISTRADO.*\n\n> Usa este comando para eliminar tu registro:\n*${usedPrefix}unreg*`)
    }

    if (!Reg.test(text)) throw `*『✦』El comando ingresado es incorrecto, úsalo de la siguiente manera:*\n\n#reg *Nombre.edad*\n\n\`\`\`Ejemplo:\`\`\`\n#reg *${name2}.25*`

    let [_, name, _, age] = text.match(Reg)
    if (!name) throw '*『✦』No puedes registrarte sin nombre.*'
    if (!age) throw '*『✦』No puedes registrarte sin la edad.*'
    if (name.length >= 30) throw '*『✦』El nombre no debe tener más de 30 caracteres.*' 

    age = parseInt(age)
    if (age > 10000) throw '*『😏』Viejo/a Sabroso/a*'
    if (age < 5) throw '*『🍼』Ven aquí, ¡te adoptaré!*'

    user.name = name.trim()
    user.age = age
    user.descripcion = bio
    user.regTime = +new Date()
    user.registered = true

    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].dragones += 10
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5

    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)        
    m.react('📩')

    let regbot = `👤 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗢 👤
⌬━━━━▣━━◤◢━━▣━━━━⌬
「👑」𝗡𝗼𝗺𝗯𝗿𝗲: ${name}
「⭐」𝗘𝗱𝗮𝗱: ${age} años
⌬━━━━▣━━◤◢━━▣━━━━⌬
「🎁」𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:
• 600 monedas 🪙
• 10 coins 🌟
• 245 Experiencia ✨
• 5 Joincount 🎟️
⌬━━━━▣━━◤◢━━▣━━━━⌬`

    await conn.sendMessage(m.chat, {
        image: { url: perfil },
        caption: regbot,
        footer: '𝑻𝑬𝑪𝑵𝑶-𝑩𝑶𝑻©®',
        buttons: [
            {
                buttonId: `.menu`,
                buttonText: { displayText: '📜 Menú Principal' },
                type: 1
            },
            {
                buttonId: `.perfil`,
                buttonText: { displayText: '👤 Ver Perfil' },
                type: 1
            }
        ],
        headerType: 4
    }, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler