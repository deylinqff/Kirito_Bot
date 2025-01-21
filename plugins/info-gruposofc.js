import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {
let img = await (await fetch(`https://files.catbox.moe/wkvi52.jpg`)).buffer()
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let txt = `*Hola!, te invito a unirte a los grupos oficiales de TECNO-BOT para convivir con la comunidad :D*

- ${namegrupo}
*👑* ${gp1}

- ${namecomu}
*⚡* ${comunidad1}

*ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ*

⚘ Enlace anulado? entre aquí! 

- ${namechannel}
*👑* ${channel}

- ᬊ᭄𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕࿐ཽ༵
*⚡* ${channel2}

> ${dev}`

await conn.sendFile(m.chat, miniurl, "Grupo.jpg", grupos, m, null, rcanal)

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']
export default handler
