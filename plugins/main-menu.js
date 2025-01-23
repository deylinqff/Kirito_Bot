import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {        
/*let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}*/
let { exp, dragones, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/va19q6.jpg')
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
const vid = ['https://qu.ax/ZVSSA.mp4', 'https://qu.ax/tfvrZ.mp4', 'https://qu.ax/FHVQP.mp4']

let menu = `𔓕꯭  ꯭ 𓏲꯭֟፝੭   ☆   ┃▞ㅤֹㅤKırı𑀱o Bo𑀱 𑜕𑜝𑜥̊̇̇̇ㅤ݄ㅤֹ  

⠻👑⠟¡Holα! 𝗰omo ᧉstαs 𝗲l diα  de hoⴗ ׅ  ${taguser}  ֹSoy Kırı𑀱o-Bo𑀱 $ {saludo}.ㅤׅ

┏━━۝ 「 𝐈𝐍𝐅𝐎 𝐂𝐑𝐄𝐀𝐃𝐎𝐑 ✿̶᳟፝֟͞𝕀 ͝⃟ ۫۫۫۫͝ ׅ」
┃❂ ⧼👑݄ꨵ⃝ᩙᮬׄᩫᰰ̸̷ ⧽ `Creador:` 𝑫𝒆𝒚𝒍𝒊𝒏
┃❂ ⧼🌟݄ꨵ⃝ᩙᮬׄᩫᰰ̸̷ ⧽ `Modo:` Publico
┃❂ ⧼💥݄ꨵ⃝ᩙᮬׄᩫᰰ̸̷ ⧽ `Baileys:` Multi Device
┃❂ ⧼🤖݄ꨵ⃝ᩙᮬׄᩫᰰ̸̷ ⧽ `Bot:`${(conn.user.jid == global.conn.user.jid ? 'Oficial' : 'Sub-Bot')}
┃❂ ⧼💎݄ꨵ⃝ᩙᮬׄᩫᰰ̸̷ ⧽ `Activado:` ${uptime}
┃❂ ⧼🔮݄ꨵ⃝ᩙᮬׄᩫᰰ̸̷ ⧽ `Usuarios:` ${totalreg}
┗━━━━━━━━━━━━━━
> Inf𑄜 Dᧉִּ֟  Usua𐐲ּ݄֟፝࣪i𑄜ᩙֵ໋ׄ 

‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎ ׅ✿⃝⃘ֵ 🙎🏻 `Cliente:` ${name}
  ׅ۫۫✿⃝⃘ֵ֘❄️ `Exp:`${exp}
  ׅ۫۫✿⃝⃘ֵ֘ 🐦‍🔥 `Dragones:` ${dragones}
  ׅ۫۫✿⃝⃘ֵ֘💎 `Rango:`${role}
┗━━━━━━━━━━━━━━━━━⌬
> 【Lı꯱𝗍α-Dꫀׁׅܻׅ݊   -C𑄙꯭ᩧmαɳꛆ݄۟𑄙꯭ᩧs】 
֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙֙
┏━━❃「 𝐈𝐧𝐟𝐨 𝐁𝐨𝐭 」❃
┃🔮⃝⃟໋̮᪲ 𝗈࣪ .botreglas
┃🔊⃝⃟໋̮᪲ 𝗈.menu
┃🌐⃝⃟໋̮᪲ 𝗈 .menujuegos
┃💠⃝⃟໋̮᪲ 𝗈.menuanime
┃💤⃝⃟໋̮᪲ 𝗈 .menuhorny 
┃🌀⃝⃟ 𝗈.menuaudios 
┃☄️⃝⃟໋̮᪲ 𝗈 .runtime
┃🌊⃝⃟໋̮᪲ 𝗈 .script
┃🪼⃝⃟໋̮᪲ 𝗈 .staff
┃❄️⃝⃟໋̮᪲ 𝗈.blocklist
┗━━━━━━━━━━━━━━━━━⪩
┏❃「Inf𑄙꯭ᩧ𐐲ּ݄֟፝࣪ⴅα𝖼ı𑄙꯭ᩧn📃⃨፝֟͝͡꒱」
💥⃟⃤ .creador
🌟⃟⃤ .editautoresponder
💥⃟⃤.owner
🌟⃟⃤ .dash
💥⃟⃤ .dashboard
🌟⃟⃤ .views
💥⃟⃤.database
🌟⃟⃤ .usuarios
💥⃟⃤.user
🌟⃟⃤ .ds
💥⃟⃤ .listprem
🌟⃟⃤.status
💥⃟⃤ .solicitud *<mensaje>*
🌟⃟⃤ .sug *<mensaje>*
💥⃟⃤.horario
🌟⃟⃤ .skyplus
💥⃟⃤ .infobot
🌟⃟⃤.ping
💥⃟⃤ .reportar
🌟⃟⃤.sistema
💥⃟⃤.speed
🌟⃟⃤.speedtest
💥⃟⃤ .reportar
━━]->
> 「🏡⃨᪲ ׅ 𝚁꯭፝֟͝egistr𝙾 ݁❀፝֟͜͝✿」
┃✿⃝⃘ֵ֘🍁  .reg
┃✿⃝⃘ֵ֘🌟  .unreg
┃✿⃝⃘ֵ֘⚡ .profile BB
┃✿⃝⃘ֵ֘💍 .marry
┃✿⃝⃘ֵ֘🧬.setgenre
┃✿⃝⃘ֵ֘🧬.delgenre
┃✿⃝⃘ֵ֘🎂 .setbirth
┃✿⃝⃘ֵ֘🥮 .delbirth
┃✿⃝⃘ֵ֘📄 .setdescription
┃✿⃝⃘ֵ֘🗑️ .deldescription
┗━━━━━━━━━━━━━━━━━⪩
> 「 Dꭵve𐐲sꭵᦅꬻ」⪨

💗⃝⃞ֱׁ੭  .amistad
🏳️‍🌈⃝⃞ֱׁ੭ .gay <@tag> | <nombre>
🏳️‍🌈⃝⃞ֱׁ੭  .lesbiana <@tag> | <nombre>
💦⃝⃞ֱׁ੭  .pajero <@tag> | <nombre>
🌚⃝⃞੭  .pajera <@tag> | <nombre>
🐕⃝⃞ֱׁ੭  .puto <@tag> | <nombre>
🦊⃝⃞ֱׁ੭ .puta <@tag> | <nombre>
👎⃝⃞ֱׁ੭  .manco <@tag> | <nombre>
👊⃝⃞ֱׁ੭ .manca <@tag> | <nombre>
🧬⃝⃞ֱׁ੭  .revelargenero `<texto>`
🐭⃝⃞ֱׁ੭ .rata <@tag> | <nombre>
🦊⃝⃞ֱׁ੭  .prostituta <@tag> | <nombre>
🐶⃝⃞ֱׁ੭ .prostituto <@tag> | <nombre> 
🙂‍↕️⃝⃞ֱׁ੭  .consejo
💔⃝⃞ֱׁ੭  .divorce
🏴‍☠️⃝⃞ֱׁ੭  .doxear
💭⃝⃞ׁ੭  .doxxing <nombre> | <@tag>
💕⃝⃞ֱׁ੭ ☬ .formarpareja
💞⃝⃞ֱׁ੭  .formarpareja5
🔥⃝⃞ֱׁ੭  .horny
🔥⃝⃞ֱׁ੭ .hornycard
🥚⃝⃞ֱׁ੭  .huevo @user
🔔⃝⃞ֱׁ੭ .iqtest
🔉⃝⃞੭  .marica
🪩⃝⃞ֱׁ੭  .meme
👏⃝⃞ֱׁ੭  .aplauso
🤎⃝⃞ֱׁ੭ .marron
⚰️⃝⃞ֱׁ੭  .suicide
💥⃝⃞ֱׁ੭  .chupalo
👩🏻‍❤️‍👨🏼⃝⃞ֱׁ੭  .minovia @user
🐾⃝⃞ֱׁ੭  .morse `<encode|decode>`
🥷⃝⃞ֱׁ੭  .nombreninja `<texto>`
💦⃝⃞ֱׁ੭  .pajeame
👀⃝⃞ֱׁ੭  .personalidad
 🗣️⃝⃞ֱׁ੭ .piropo
💠⃝⃞ֱׁ੭  .pokedex `<pokemon>`
⁉️⃝⃞ֱׁ੭  .pregunta
💞⃝⃞ֱׁ੭  .ship
💘⃝⃞ֱׁ੭  .love
🌟⃝⃞ֱׁ੭   .simpcard
🏆⃝⃞ֱׁ੭ .sorteo
🐋⃝⃞ֱׁ੭  .itssostupid
🐒⃝⃞ֱׁ੭ .estupido
🗣️⃝⃞ֱׁ੭  .stupid
🎮⃝⃞ֱׁ੭  .top *<texto>*
☀️⃝⃞ֱׁ੭  .formartrio 
🔊⃝⃞ֱׁ੭  . usuario1 @usuario2
 🪨⃝⃞ֱׁ੭ .waste @user
🔮⃝⃞ֱׁ੭ .zodiac *2002 02 25*
┗━━━━━━━━━━━━━━━
━━⪩⋯ֺ─⵿─⋱ְֺ⋱ְֺ
┏━━⪩「 `J𝘶𝘦g᥆s`🎮⪨
┍ֺ─╱ֺ݄⋰─⵿─ֺ⋯݄⋯」⪨
┃🪩⃞⃝𑁁፝֟    .cancion
┃👣⃞⃝𑁁፝֟    .pista
┃🎮⃞⃝𑁁፝֟    .ttt nueva sala 
┃✏️⃞⃝𑁁፝֟    .ahorcado
┃🕹️⃞⃝𑁁፝֟    .math <mode>
┃🎮⃞⃝𑁁፝֟   .ppt
┃🤼⃞⃝𑁁፝֟   .pvp @user
┃⏲️⃞⃝𑁁፝֟    .reto
┃❓⃞⃝𑁁፝֟    .sopa
┃✅⃞⃝𑁁፝֟    .verdad
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 `Em᥆x-Aᥒі𝘮ᥱ`⛲⃞⃟
 .   ꪆ❀ᩧ꤬୧  .︶⃨֟፝︶⃨֟፝」⪨
┃😡⃞⃝𑁁፝֟   .angry/enojado @tag
┃🧖🏻⃞⃝𑁁፝֟    .bath/bañarse @tag
┃🫦⃞⃝𑁁፝֟    .bite/morder @tag
┃👅⃞⃝𑁁፝֟    .bleh/lengua @tag
┃😳⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .blush/sonrojarse @tag
┃🥱⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .bored/aburrido @tag
┃💰⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .coffe/cafe @tag
┃😭⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .cry/llorar @tag
┃🙂‍↕⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ.cuddle/acurrucarse @tag
┃🪩⃞⃟ᩘ᩠ᩨᩞᩡ .dance/bailar @tag
┃🍻⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .drunk/borracho @tag
┃🍽️⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .eat/comer @tag
┃👏 ̷̸̶͠ᩘ᩠ᩨᩞᩡ .facepalm/palmada @tag
┃👐⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .grop/manosear @tag
┃😺⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .happy/feliz @tag
┃👋⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .hello/hola @tag
┃🫂⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .hug/abrazar @tag
┃🔪⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .kill/matar @tag
┃💋⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .kiss/besar @tag
┃👩‍❤️‍💋‍👨⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .kiss2/besar2 @tag
┃🤣⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .laugh/reirse @tag
┃👅⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .lick/lamer @tag
┃💓⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .love2/enamorada @tag
┃💞⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .patt/acariciar @tag
┃⛏️⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .poke/picar @tag
┃👀⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .pout/pucheros @tag
ᩘ᩠ᩨᩞ┃🤰⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ.preg/embarazar @tag
┃👊⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .punch/golpear @tag
┃🏃⃞⃟ᩘ᩠ᩨᩞᩡ .run/correr @tag
┃😔⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ.sad/triste @tag
┃😰⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ.scared/asustada @tag
┃😏⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ.seduce/seducir @tag
┃🪭⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .shy/timida @tag
┃🫱🏻⃞⃟ᩘ᩠ᩨᩞᩡ.slap/bofetada @tag
┃💤⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .sleep/dormir @tag
┃🚬⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ.smoke/fumar @tag
┃💭⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .think/pensando @tag
┃💦⃞⃟ ̷̸̶͠ᩘ᩠ᩨᩞᩡ .undress/encuerar @tag
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 H᥆r𝘯𝘺🔥⃞⃟🪽 .   ꪆ❀ᩧ꤬ᚐ 」⪨
┃🔥⃞⃝𑁁፝֟   .sixnine/69 @tag
┃🔥⃞⃝𑁁፝֟   .anal/culiar @tag
┃💦⃞⃝𑁁፝    .blowjob/mamada @tag
┃🍁 ⃞⃝𑁁፝֟    .boobjob/rusa @tag
┃🥛⃞⃝𑁁፝֟    .cum/leche @tag
┃💦⃞⃝𑁁፝֟   .fap/paja @tag
┃🔥⃞⃝𑁁፝֟    .follar @tag
┃🍁⃞⃝𑁁፝֟    .footjob/pies @tag
┃💦⃞⃝𑁁፝֟    .fuck/coger @tag
┃🔥⃞⃝𑁁፝֟    .fuck2/coger2 @tag
┃🍒⃞⃝𑁁፝    .grabboobs/agarrartetas @tag
┃💦⃞⃝𑁁፝֟     .penetrar @user
┃🔥⃞⃝𑁁፝֟   .lickpussy/coño @tag
┃🔥⃞⃝𑁁፝֟    .sexo/sex @tag
┃🍑⃞⃝𑁁፝֟    .spank/nalgada @tag
┃🫦⃞⃝𑁁፝   .suckboobs/chupartetas @tag
┃🥵⃞⃝𑁁፝֟     .violar/perra @tag
┃🏳️‍🌈⃞⃝𑁁፝֟      .lesbianas/tijeras @tag
┃🔥⃞⃝𑁁፝֟    .rule34 <personaje>
┗━━━━━━━━━━━━━━━
━━⪩
┏━⪩「Rᨵ̷ׁׅׅ᳟ℓ᳟ℓ᳟wα᳟࡛ι᳟fυ᳟s༒ 」
┃ᩡ𝔺⃞̸̷ּ⃨⃜⁉️ .character
┃ᩡ𝔺⃞̸̷ּ⃨⃜‼️ .darrw
┃ᩡ𝔺⃞̸̷ּ⃨⃜💎 .obtenidos
┃ᩡ𝔺⃞̸̷ּ⃨⃜⁉️ .c
┃ᩡ𝔺⃞̸̷ּ⃨⃜‼️.robarpersonaje
┃ᩡ𝔺⃞̸̷ּ⃨⃜💎 .rw
┃ᩡ𝔺⃞̸̷ּ⃨⃜⁉️ .toprw
┗━━━━━━━━━━━━━━━━━⪩
> ┏━━⪩「E𝖼𝗈ᩥ𝗇⃨𝗈𝗺⃨𝗂𝗮⃨💰」⪨
┃⃢⁑  🪙 .apostar 
┃ ⃢⁑ 👣 .bal
┃ ⃢ ⁑ ⚜️ .bank
┃⃢⁑ 🐉 .dragones
┃⃢⁑ 🫂 .prestar
┃⃢⁑ ‼️ .deuda
┃⃢⁑ ✔️ .pagar
┃⃢⁑ 🏆 .apostar `<cantidad>`
┃⃢⁑⚜️  .cf
┃⃢⁑ 👣 .crimen
┃⃢⁑ 🪙 .depositar
┃⃢⁑ ⛏️ .minar
┃⃢⁑ 💰 .retirar
┃⃢⁑ 💵 .rob2
┃⃢⁑ 💸 .rob
┃⃢⁑ 🎡 .ruleta `<cantidad> `<color>`
┃⃢⁑ 🧧 .Buy
┃⃢⁑ 💷 .Buyall
┃⃢⁑ 💸 .slot <apuesta>
┃⃢⁑ 💰 .slut
┃⃢⁑ 💷 .trabajar
┃⃢⁑ 💸 .transfer [tipo] [cantidad] [@tag]
┗━━━━━━━━━━━━━━━━━⪩
> ┏━━⪩「𝘙-𝐏-𝐆ᚐ 」
┃⳼⃝̼͝✈️.adventure
┃⳼⃝̼͝🪧.annual
┃⳼⃝̼͝💰 .cofre
┃⳼⃝̼͝💎.daily
┃⳼⃝̼͝💵 .claim
┃⳼⃝̼͝💍 .cazar
┃⳼⃝̼͝🎃 .halloween
┃⳼⃝̼͝‼️ .heal
┃⳼⃝̼͝📲 .lb
┃⳼⃝̼͝🔊 .levelup
┃⳼⃝̼͝💱 .inventario 
┃⳼⃝̼͝🌟 .mazmorra
┃⳼⃝̼͝💥 .monthly
┃⳼⃝̼͝🎄 .navidad
┃⳼⃝̼͝💫 .addprem [@user] <days>
┃⳼⃝̼͝☀️.weekly
┗━━━━━━━━━━━━━━━━━⪩
> ┏━━⪩「Sєrbσ𝗍/C૭︪︩dє 」⪨

┃🤖᷼ᰍ .jadibot 
┃❌᷼ᰍ .deletebot
┃🤖᷼ᰍ .bots
┃🛑᷼ᰍ .stop
┃🤖᷼ᰍ .serbot
┃🤖᷼ᰍ .serbot --code 
┃💎᷼ᰍ .token
┃💰᷼ᰍ .rentbot
┗━━━━━━━━━━━━━━━━━⪩
┏━⪩
> 「𝐁̸̷υ᳟sƈ᳟α᳟࡛ժׁ᳟ᨵ̷ׁׅׅ᳟ɾ᳟ꫀs༒ 」⪨
┃💎 ⃟ᜰ꙰ .animesearch
┃📲 ⃟ᜰ꙰ .appstore
┃🛜 ⃟ᜰ .bingsearch
┃⚜️ ⃟ᜰ .cuevana
┃⁉️ ⃟ᜰ .githubsearch
┃ 🌀 ⃟ᜰ.gimage
┃🔎 ⃟ᜰ .gnula
┃⁉️ ⃟ᜰ꙰ .googlesearch `<texto>`
┃‼️ ⃟ᜰ .npmjs
┃👣 ⃟ᜰ .steam
┃📲 ⃟ᜰ꙰ .twitterstalk <username>
┃📱 ⃟ᜰ꙰ .tiktoksearch <txt>
┃👀 ⃟ᜰ꙰ .tweetposts `<búsqueda>`
┃💭 ⃟ᜰ꙰.wikis
┃♥️ ⃟ᜰ꙰ .xnxxsearch <query>
┃💎 ⃟ᜰ꙰ .ytsearch
┃🌃 ⃟ᜰ꙰ .imagen <query>
┃⚡ ⃟ᜰ꙰  .infoanime
┃🌟 ⃟ᜰ꙰ .animelink
┗━━━━━━━━━━━━━━━⪨
> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 ☆𝑫𝒆𝒚𝒍𝒊𝒏☆`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: '𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕', body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })
await m.react(emojis)    

} catch (e) {
await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
await m.react(error)
}}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto'] 
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}