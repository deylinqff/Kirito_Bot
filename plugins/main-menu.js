import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {        
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, yenes, level, role } = global.db.data.users[m.sender]
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
let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
const vid = ['https://qu.ax/tfvrZ.mp4', 'https://qu.ax/ZVSSA.mp4', 'https://qu.ax/FHVQP.mp4', 'https://files.catbox.moe/0kv1om.mp4']
let menu = `*⌬━━━━━▣━━◤⌬◢━━▣━━━━━━⌬*

Hola *%name* soy *Kirito-Bot*

╔════⌬══◤𝑪𝑹𝑬𝑨𝑫𝑶𝑹◢
║  👑 𝑫𝒆𝒚𝒍𝒊𝒏
╚════⌬══◤✰✰✰✰✰◢

╔══════⌬『 𝑰𝑵𝑭𝑶-𝑩𝑶𝑻 』
║ 🚀 〘Cliente: %name
║ 🚀 〘Exp: %exp
║ 🚀 〘Nivel: %level
╚══════ ♢.✰.♢ ══════

╔═══════⌬『 𝑰𝑵𝑭𝑶-𝑼𝑺𝑬𝑹 』
║ ⚡ 〘Bot: ${botname}
║ ⚡ 〘Modo Público
║ ⚡ 〘Baileys: Multi Device
║ ⚡ 〘Tiempo Activo: %muptime
║ ⚡ 〘Usuarios: %totalreg 
╚══════ ♢.✰.♢ ══════

*◤━━━━━ ☆. ⌬ .☆ ━━━━━◥*
 *【𝕷 𝖎 𝖘 𝖙 𝖆 - 𝕯𝖊 - 𝕮 𝖔 𝖒 𝖆 𝖓 𝖉 𝖔 𝖘】* 

┏━━⪩「 ♡⃝𝕴𝖓𝖋𝖔𝖗𝖒𝖆𝖈𝖎ó𝖓ᚐ҉ᚐ 」⪨
┃❀ .menu
┃❀ .runtime
┃❀ .script
┃❀ .staff
┃❀ .blocklist
┃❀ .creador
┃❀ .editautoresponder
┃❀ .owner
┃❀ .database
┃❀ .usuarios
┃❀ .ds
┃❀ .listprem
┃❀ .status
┃❀ .solicitud *<mensaje>*
┃❀ .sug *<mensaje>*
┃❀ .skyplus
┃❀ .infobot
┃❀ .ping
┃❀ .reportar
┃❀ .sistema
┃❀ .reportar
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕽𝖊𝖌𝖎𝖘𝖙𝖗𝖔ᚐ҉ᚐ 」⪨
┃❋ .reg
┃❋ .unreg
┃❋ .profile
┃❋ .marry
┃❋ .divorce
┃❋ .confesar
┃❋ .setgenre
┃❋ .delgenre
┃❋ .setbirth
┃❋ .delbirth
┃❋ .setdescription
┃❋ .deldescription
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕯𝖎𝖛𝖊𝖗𝖘𝖎ó𝖓ᚐ҉ᚐ 」⪨
┃☬ .amistad
┃☬ .gay <@tag> | <nombre>
┃☬ .lesbiana <@tag> | <nombre>
┃☬ .pajero <@tag> | <nombre>
┃☬ .pajera <@tag> | <nombre>
┃☬ .puto <@tag> | <nombre>
┃☬ .puta <@tag> | <nombre>
┃☬ .manco <@tag> | <nombre>
┃☬ .manca <@tag> | <nombre>
┃☬ .revelargenero *<texto>*
┃☬ .rata <@tag> | <nombre>
┃☬ .prostituta <@tag> | <nombre>
┃☬ .prostituto <@tag> | <nombre> 
┃☬ .consejo
┃☬ .doxear
┃☬ .doxxing <nombre> | <@tag>
┃☬ .formarpareja5
┃☬ .huevo @user
┃☬ .iqtest
┃☬ .marica
┃☬ .meme
┃☬ .aplauso
┃☬ .marron
┃☬ .suicide
┃☬ .chupalo
┃☬ .nombreninja *<texto>*
┃☬ .pajeame
┃☬ .ppcouple
┃☬ .personalidad
┃☬ .piropo
┃☬ .pokedex *<pokemon>*
┃☬ .pregunta
┃☬ .ship
┃☬ .sorteo
┃☬ .top *<texto>*
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕵𝖚𝖊𝖌𝖔𝖘ᚐ҉ᚐ 」⪨
┃✧ .ttt nueva sala 
┃✧ .ahorcado
┃✧ .math <mode>
┃✧ .ppt
┃✧ .pvp @user
┃✧ .reto
┃✧ .sopa
┃✧ .verdad
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕰𝖒𝖔𝖏𝖎-𝕬𝖓𝖎𝖒𝖊ᚐ҉ᚐ 」⪨
┃✥ .angry/enojado @tag
┃✥ .bath/bañarse @tag
┃✥ .bite/morder @tag
┃✥ .bleh/lengua @tag
┃✥ .blush/sonrojarse @tag
┃✥ .bored/aburrido @tag
┃✥ .coffe/cafe @tag
┃✥ .cry/llorar @tag
┃✥ .cuddle/acurrucarse @tag
┃✥ .dance/bailar @tag
┃✥ .drunk/borracho @tag
┃✥ .eat/comer @tag
┃✥ .facepalm/palmada @tag
┃✥ .grop/manosear @tag
┃✥ .happy/feliz @tag
┃✥ .hello/hola @tag
┃✥ .hug/abrazar @tag
┃✥ .kill/matar @tag
┃✥ .kiss/besar @tag
┃✥ .kiss2/besar2 @tag
┃✥ .laugh/reirse @tag
┃✥ .lick/lamer @tag
┃✥ .love2/enamorada @tag
┃✥ .patt/acariciar @tag
┃✥ .poke/picar @tag
┃✥ .pout/pucheros @tag
┃✥ .preg/embarazar @tag
┃✥ .punch/golpear @tag
┃✥ .run/correr @tag
┃✥ .sad/triste @tag
┃✥ .scared/asustada @tag
┃✥ .seduce/seducir @tag
┃✥ .shy/timida @tag
┃✥ .slap/bofetada @tag
┃✥ .sleep/dormir @tag
┃✥ .smoke/fumar @tag
┃✥ .think/pensando @tag
┃✥ .undress/encuerar @tag
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕹𝕾𝕱𝖂ᚐ҉ᚐ 」⪨
┃✤ .sixnine/69 @tag
┃✤ .anal/culiar @tag
┃✤ .blowjob/mamada @tag
┃✤ .boobjob/rusa @tag
┃✤ .cum/leche @tag
┃✤ .fap/paja @tag
┃✤ .follar @tag
┃✤ .footjob/pies @tag
┃✤ .fuck/coger @tag
┃✤ .fuck2/coger2 @tag
┃✤ .grabboobs/agarrartetas @tag
┃✤ .penetrar @user
┃✤ .lickpussy/coño @tag
┃✤ .sexo/sex @tag
┃✤ .spank/nalgada @tag
┃✤ .suckboobs/chupartetas @tag
┃✤ .violar/perra @tag
┃✤ .lesbianas/tijeras @tag
┃✤ .rule34 <personaje>
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕽𝖔𝖑𝖑𝖜𝖆𝖎𝖋𝖚𝖘ᚐ҉ᚐ 」⪨
┃✦ .No disponible por el momento :v
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕰𝖈𝖔𝖓𝖔𝖒í𝖆ᚐ҉ᚐ 」⪨
┃✱ .apostar 
┃✱ .bal
┃✱ .bank
┃✱ .yenes
┃✱ .prestar
┃✱ .deuda
┃✱ .pagar
┃✱ .apostar *<cantidad>*
┃✱ .cf
┃✱ .crimen
┃✱ .depositar
┃✱ .minar
┃✱ .retirar
┃✱ .rob2
┃✱ .rob
┃✱ .ruleta *<cantidad> <color>*
┃✱ .Buy
┃✱ .Buyall
┃✱ .slot <apuesta>
┃✱ .slut
┃✱ .trabajar
┃✱ .transfer [tipo] [cantidad] [@tag]
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝×𝕽×𝕻×𝕲×ᚐ҉ᚐ 」⪨
┃♤ .adventure
┃♤ .annual
┃♤ .cofre
┃♤ .daily
┃♤ .claim
┃♤ .cazar
┃♤ .halloween
┃♤ .heal
┃♤ .lb
┃♤ .levelup
┃♤ .inventario 
┃♤ .mazmorra
┃♤ .monthly
┃♤ .navidad
┃♤ .addprem [@user] <days>
┃♤ .weekly
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕾𝖊𝖗𝖇𝖔𝖙/𝕮𝖔𝖉𝖊ᚐ҉ᚐ 」⪨
┃✾ .jadibot 
┃✾ .deletebot
┃✾ .bots
┃✾ .stop
┃✾ .serbot
┃✾ .serbot --code 
┃✾ .token
┃✾ .rentbot
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕭𝖚𝖘𝖈𝖆𝖉𝖔𝖗𝖊𝖘ᚐ҉ᚐ 」⪨
┃❖ .animesearch
┃❖ .cuevana
┃❖ .githubsearch
┃❖ .gnula
┃❖ .googlesearch *<texto>*
┃❖ .npmjs
┃❖ .steam
┃❖ .tiktoksearch <txt>
┃❖ .wikis
┃❖ .xnxxsearch <query>
┃❖ .ytsearch
┃❖ .imagen <query>
┃❖ .infoanime
┃❖ .animelink
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕯𝖊𝖘𝖈𝖆𝖗𝖌𝖆𝖘ᚐ҉ᚐ 」⪨
┃Ѽ .animedl
┃Ѽ .animeinfo
┃Ѽ .apk
┃Ѽ .apkmod
┃Ѽ .facebook
┃Ѽ .fb
┃Ѽ .gdrive
┃Ѽ .gitclone *<url git>*
┃Ѽ .instagram2
┃Ѽ .ig2
┃Ѽ .imagen <query>
┃Ѽ .mangad <manga> <capítulo>
┃Ѽ .mediafire
┃Ѽ .mega
┃Ѽ .npmdl
┃Ѽ .ytdl *<link>*
┃Ѽ .aptoide
┃Ѽ .pinterest
┃Ѽ .pinvid
┃Ѽ .play
┃Ѽ .play2
┃Ѽ .playdoc
┃Ѽ .playdoc2
┃Ѽ .ytmp3 *<link>*
┃Ѽ .ytpm4 *<link>*
┃Ѽ .ytmp3doc *<link>*
┃Ѽ .ytmp4doc *<link>*
┃Ѽ .terabox 
┃Ѽ .spotify
┃Ѽ .tiktokimg <url>
┃Ѽ .tiktokmp3 *<link>*
┃Ѽ .tiktok
┃Ѽ .tiktok2 *<link>*
┃Ѽ .tw
┃Ѽ .ss2
┃Ѽ .ssvid
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝×𝕬×𝕴×ᚐ҉ᚐ 」⪨
┃☫ .demo
┃☫ .fux
┃☫ .gemini
┃☫ .yuki
┃☫ .bot
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕲𝖗𝖚𝖕𝖔𝖘ᚐ҉ᚐ 」⪨
┃♕ .add
┃♕ .admins <texto>
┃♕ .bienvenidos/nuevos
┃♕ .nights/noches
┃♕ .dias/days
┃♕ .grupotime *<open/close>* *<número>*
┃♕ .grupo abrir / cerrar
┃♕ .delete
┃♕ .demote
┃♕ .encuesta <text|text2>
┃♕ .hidetag
┃♕ .inactivos
┃♕ .infogrupo
┃♕ .invite *<numero>*
┃♕ .kick
┃♕ .listonline
┃♕ .link
┃♕ .promote
┃♕ .rentar
┃♕ .rentar2 *<link>*
┃♕ .revoke
┃♕ .setname <text>
┃♕ .tagall *<mesaje>*
┃♕ .invocar *<mesaje>*
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕳𝖊𝖗𝖗𝖆𝖒𝖎𝖊𝖓𝖙𝖆𝖘 」⪨
┃✰ .cal *<ecuacion>*
┃✰ .horario
┃✰ .clima *<lugar>*
┃✰ .fake
┃✰ .hd
┃✰ .nuevafotochannel
┃✰ .nosilenciarcanal
┃✰ .silenciarcanal
┃✰ .noseguircanal
┃✰ .seguircanal
┃✰ .avisoschannel
┃✰ .resiviravisos
┃✰ .inspect
┃✰ .inspeccionar
┃✰ .eliminarfotochannel
┃✰ .reactioneschannel
┃✰ .reaccioneschannel
┃✰ .nuevonombrecanal
┃✰ .nuevadescchannel
┃✰ .readmore *<teks>|<teks>*
┃✰ .reenviar
┃✰ .spamwa <number>|<mesage>|<no of messages>
┃✰ .ssweb
┃✰ .ss
┃✰ .document *<audio/video>*
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕮𝖔𝖓𝖛𝖊𝖗𝖙𝖎𝖉𝖔𝖗𝖊𝖘ᚐ҉ᚐ 」⪨
┃ꕥ .ibb
┃ꕥ .paste nombre txt
┃ꕥ .toanime
┃ꕥ .togifaud
┃ꕥ .tourl
┃ꕥ .tovideo
┃ꕥ .tts <lang> <teks>
┃ꕥ .tts2
┃ꕥ .tourl2
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕾𝖙𝖎𝖈𝖐𝖊𝖗𝖘ᚐ҉ᚐ 」⪨
┃☠︎︎ .emojimix *<emoji+emoji>*
┃☠︎︎ .pfp
┃☠︎︎ .qc
┃☠︎︎ .stiker <img>
┃☠︎︎ .sticker <url>
┃☠︎︎ .toimg (reply)
┃☠︎︎ .take *<nombre>|<autor>*
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕮𝖔𝖓𝖋𝖎𝖌𝖚𝖗𝖆𝖈𝖎ó𝖓ᚐ҉ᚐ 」⪨
┃⚘ .enable <option>
┃⚘ .disable <option>
┃⚘ .autoadmin
┃⚘ .banchat
┃⚘ .banuser <@tag> <razón>
┃⚘ .grupocrear <nombre>
┃⚘ .join <link>
┃⚘ .unbanchat
┃⚘ .unbanuser <@tag>
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕮𝖗𝖊𝖆𝖉𝖔𝖗ᚐ҉ᚐ 」⪨
┃🜲 .listafk
┃🜲 .expired *<días>*
┃🜲 .addyenes *<@user>*
┃🜲 .addprem [@user] <days>
┃🜲 .copia
┃🜲 .broadcast
┃🜲 .bcgc
┃🜲 .bcgc2
┃🜲 .cleanfiles
┃🜲 .spamwa <enlace>|<mesage>|<número>
┃🜲 .setcmd *<texto>*
┃🜲 .deletefile
┃🜲 .delexpired
┃🜲 .delvn <text>
┃🜲 .delimg <text>
┃🜲 .delsticker <text>
┃🜲 .delprem <@user>
┃🜲 .reunion *<texto>*
┃🜲 .removeowner @user
┃🜲 .dsowner
┃🜲 $
┃🜲 .fetch
┃🜲 .get
┃🜲 .getplugin *<nombre>*
┃🜲 .groups
┃🜲 .grouplist
┃🜲 .kickall @user
┃🜲 .prefix [prefix]
┃🜲 .resetpersonajes
┃🜲 .resetprefix
┃🜲 .restart
┃🜲 .saveplugin nombre
┃🜲 .update
┃🜲 >
┃🜲 =>
┗━━━━━━━━━━━━━━━━━⪨
> © 𝒫𝑜𝓌𝑒𝓇𝑒𝒹 𝐵𝓎 𝓓𝓮𝔂𝓵𝓲𝓷`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: '♡⃝🚀𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕ᚐ҉ᚐ', body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })
await m.react(emojis)    

} catch (e) {
await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
await m.react(error)
}}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}