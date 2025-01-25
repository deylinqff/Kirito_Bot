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

let tags = {
  'anime': '🧧 ANIME 🎐',
  'main': '❗ INFO ❕',
  'search': '🔎 SEARCH 🔍',
  'game': '🕹️ GAME 🎮',
  'serbot': '⚙️ SUB BOTS 🤖',
  'rpg': '🌐 RPG 🥇',
  'rg': '🎑 REGISTRO 🎟️',
  'sticker': '💟 STICKER 🏷️',
  'img': '🖼️ IMAGE 🎇',
  'group': '👥 GROUPS 📢',
//  'logo': 'MAKER',
  'nable': '🎛️ ON / OFF 🔌', 
  'premium': '💎 PREMIUM 👑',
  'downloader': '📥 DOWNLOAD 📤',
  'tools': '🔧 TOOLS 🛠️',
  'fun': '🎉 FUN 🎊',
  'nsfw': '🔞 NSFW 📛', 
  'cmd': '🧮 DATABASE 🖥️',
  'owner': '👤 OWNER 👁️', 
  'audio': '📣 AUDIOS 🔊', 
  'advanced': '🗝️ ADVANCED 📍',
}

const defaultMenu = {
  before: `
> 「 ⚙️ MENU DE TECNO ⚙️ 」\n

›    ╔╦══• •✠•⚙️•✠ • •══╦╗
›     🚀☆𝐓𝐄𝐂𝐍𝐎-𝐁𝐎𝐓☆🚀   
›    ╚╩══• •✠•⚙️•✠ • •══╩╝
╔═════ ▓▓ ࿇ ▓▓ ═════╗
║🚀 ➬ *Cliente:* %name
║🚀 ➬ *Estrellas:* %limit
║🚀 ➬ *Creador:* Deylin
║🚀 ➬ *Xp:* %exp / %maxexp
║🚀 ➬ *TotalXp:* %totalexp
╚═════ ▓▓ ࿇ ▓▓ ═════╝
╔════ ≪ •❈• ≫ ════╗
║#    🌐   *𝐈 N F O  ‹‹❑*
╚════ ≪ •❈• ≫ ════╝
╔─━━━━━━░★░━━━━━━─╗
┃🌐 ➬ *Modo:* %mode
┃🌐 ➬ *Prefijo:* [ *%_p* ]
┃🌐 ➬ *Rutina:* %muptime 
┃🌐 ➬ *Database:*  %totalreg
╚─━━━━━━░★░━━━━━━─╝
     
   ⏤͟͟͞͞𝐓𝐞𝐜𝐧𝐨-𝐁𝐨𝐭ꗄ➺
◆ ▬▬▬▬▬▬ ❴✪❵ ▬▬▬▬▬▬ ◆ 
 %readmore
\t\t\t⚙️_*𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒*_ 🚀
`.trimStart(),
  header: '*╔═══❖〘 *%category* 〙❖═══╗*',
  body: '║🚀›〘 %cmd %islimit %isPremium\n',
  footer: '*╚═══❖•ೋ° °ೋ•❖═══╝*',
  after: `© ${textbot}`,
}

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