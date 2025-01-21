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

let menu = `𔓕꯭  ꯭ 𓏲꯭֟፝੭   ☆   𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭  ☆   𓏲꯭֟፝੭ ꯭  ꯭𔓕

👑 ¡𝐇𝐨𝐥𝐚! 𝐂𝐨𝐦𝐨 𝐄𝐬𝐭𝐚𝐬 𝐄𝐥 𝐃𝐢𝐚 𝐃𝐞 𝐇𝐨𝐲 *${taguser}* 𝐒𝐨𝐲 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 ${saludo}. 

Hola `'${taguser}*`
*${saludo}*
❏ `ᴜꜱᴜᴀʀɪᴏꜱ` : _2 de 16_
❏ `ᴘʀᴇꜰɪᴊᴏ` : [ . ]
❏ `ғᴇᴄʜᴀ` : *[ 21 de enero de 2025 ]*
*─━─━≪✠≫━─━─*
  
┏─━─━≪✠≫━─━─
│`💥ᴅᴇsᴄᴀʀɢᴀs💥`
┗─━─━≪✠≫━─━─
┊❏ `.fb <link>`
┊❏ `.fb *<link>*`
┊❏ `.gptfb <link>`
┊❏ `.mediafire`
┊❏ `.soundcloud <txt>`
┊❏ `.music <texto>`
┊❏ `.apk <texto>`
┊❏ `.applemusic <txt>`
┊❏ `.ig <link>`
┊❏ `.ig2 <link>`
┊❏ `.ig <url>`
┊❏ `.mixdl`
┊❏ `.tiktoksearch <txt>`
┊❏ `.tiktok <url>`
┊❏ `.ytmp3 <url>`
┊❏ `.ytmusic <url>`
┊❏ `.ytmp4doc <url>`
┊❏ `.ytvideo <url>`
┊❏ `.playdoc`
┊❏ `.audio`
┊❏ `.play <texto>`
┊❏ `.play2 <texto>`
┊❏ `.play2 <texto>`
┊❏ `.lito1`
┊❏ `.song <texto>`
┊❏ `.video1`
┊❏ `.spotify <texto>`
┊❏ `.lito9`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ᴍᴇɴᴜ ɪᴀ💥`
┗─━─━≪✠≫━─━─
┊❏ `.arte <texto>`
┊❏ `.dalle <texto>`
┊❏ `.litogpt <texto>`
┊❏ `.hd`
┊❏ `.litodroid <texto>`
┊❏ `.litobot <texto>`
┊❏ `.openai <texto>`
┊❏ `.gemini <texto>`
┊❏ `.copilot <texto>`
┊❏ `.bing <texto>`
┊❏ `.arte2 *<texto>*`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ᴀɴɪᴍᴇ💥`
┗─━─━≪✠≫━─━─
┊❏ `.character`
┊❏ `.confirmar`
┊❏ `.darrw @usuario <personaje>`
┊❏ `.obtenidos`
┊❏ `.roll`
┊❏ `.rw`
┊❏ `.toprw`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ɪɴᴛᴇʀɴᴇᴛ💥`
┗─━─━≪✠≫━─━─
┊❏ `.gimage <texto>`
┊❏ `.imagen <texto>`
┊❏ `.playstore <aplicacion>`
┊❏ `.quemusica <@tag>`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ᴇᴘʜᴏᴛᴏ360💥`
┗─━─━≪✠≫━─━─
┊❏ `.logo1 <text>`
┊❏ `.logo2 <text>`
┊❏ `.logo3 <text>`
┊❏ `.logo4 <text>`
┊❏ `.logo5 <text>`
┊❏ `.logo6 <text>`
┊❏ `.logo7 <text>`
┊❏ `.logo8 <text>`
┊❏ `.logo9 <text>`
┊❏ `.logo10 <text>`
┊❏ `.logo11 <text>`
┊❏ `.logo12 <text>`
┊❏ `.logo13 <text>`
┊❏ `.logo14 <text>`
┊❏ `.logo15 <text>`
┊❏ `.logo16 <text>`
┊❏ `.logo17 <text>`
┊❏ `.logo18 <text>`
┊❏ `.logo19 <text>`
┊❏ `.logo20 <text>`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ʙᴜsǫᴜᴇᴅᴀ💥`
┗─━─━≪✠≫━─━─
┊❏ `.buscar *<texto>*`
┊❏ `.spotify`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ɢʀᴜᴘᴏꜱ💥`
┗─━─━≪✠≫━─━─
┊❏ `.ss <url>`
┊❏ `.ssweb <url>`
┊❏ `.tagall`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ᴍᴇɴᴜ ʀᴘɢ💥`
┗─━─━≪✠≫━─━─
┊❏ `.banco`
┊❏ `.perfil`
┊❏ `.balance`
┊❏ `.cartera`
┊❏ `.buy`
┊❏ `.buyall`
┊❏ `.claim`
┊❏ `.depositardm`
┊❏ `.ranking`
┊❏ `.levelup`
┊❏ `.minardiamante`
┊❏ `.midm`
┊❏ `.minar`
┊❏ `.retirardm`
┊❏ `.robardm <tag>`
┊❏ `.robarxp <tag>`
┊❏ `.reg <name.age>`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ʀᴇᴀᴄᴄɪᴏɴᴇs💥`
┗─━─━≪✠≫━─━─
┊❏ `.bully @tag`
┊❏ `.cuddle @tag`
┊❏ `.cry @tag`
┊❏ `.hug @tag`
┊❏ `.awoo @tag`
┊❏ `.kiss @tag`
┊❏ `.lick @tag`
┊❏ `.pat @tag`
┊❏ `.smug @tag`
┊❏ `.bonk @tag`
┊❏ `.yeet @tag`
┊❏ `.blush @tag`
┊❏ `.smile @tag`
┊❏ `.wave @tag`
┊❏ `.highfive @tag`
┊❏ `.handhold @tag`
┊❏ `.nom @tag`
┊❏ `.bite @tag`
┊❏ `.glomp @tag`
┊❏ `.slap @tag`
┊❏ `.kill @tag`
┊❏ `.happy @tag`
┊❏ `.wink @tag`
┊❏ `.poke @tag`
┊❏ `.dance @tag`
┊❏ `.cringe @tag`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ꜱᴛɪᴄᴋᴇʀ💥`
┗─━─━≪✠≫━─━─
┊❏ `.stiker`
┊❏ `.emojimix <emoji+emoji>`
╰───────────── –

┏─━─━≪✠≫━─━─
│`💥ꜱᴇʀ-ʙᴏᴛ💥`
┗─━─━≪✠≫━─━─
┊❏ `.listabot`
┊❏ `.bots`
┊❏ `.subsbots`
┊❏ `.serbot`
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