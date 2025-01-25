import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

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
  'nable': '🎛️ ON / OFF 🔌', 
  'premium': '💎 PREMIUM 👑',
  'downloader': '📥 DOWNLOAD 📤',
  'tools': '🔧 TOOLS 🛠️',
  'fun': '🎉 FUN 🎊',
  'nsfw': '🔞 NSFW 📛', 
  'cmd': '🧮 DATABASE 🖥️',
  'owner': '👤 OWNER 👁️', 
  'audio': '📣 AUDIOS 🔊', 
  'advanced': '🗝️ ADVANCED 🎮',
}

const defaultMenu = {
  before: `
*⌬━━━━━▣━━◤⌬◢━━▣━━━━━━⌬*

Hola *%name*, soy *TECNO*

╔════⌬══◤𝑪𝑹𝑬𝑨𝑫𝑶𝑹◢
║  ♛ 𝑫𝒆𝒚𝒍𝒊𝒏
╚════⌬══◤✰✰✰✰✰◢

*◤━━━━━ ☆. ⌬ .☆ ━━━━━◥*
%readmore
⚙_*𝑳𝑰𝑺𝑻𝑨 𝑫𝑬 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺*_
`.trimStart(),
  header: '*┏━━━━▣━━⌬〘 %category 〙*',
  body: '┃✎›〘 %cmd %islimit %isPremium\n',
  footer: '*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*',
  after: '\n\n📌 Recuerda usar los comandos con responsabilidad.',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let taguser = '@' + m.sender.split("@")[0]
    let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/va19q6.jpg')
    let vid = ['https://qu.ax/ZVSSA.mp4', 'https://qu.ax/tfvrZ.mp4', 'https://qu.ax/FHVQP.mp4']

    let { exp, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let totalreg = Object.keys(global.db.data.users).length
    let readMore = String.fromCharCode(8206).repeat(4001)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled)

    let _text = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag => {
        return defaultMenu.header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(plugin => plugin.tags?.includes(tag)).map(plugin => {
            return plugin.help.map(cmd => {
              return defaultMenu.body
                .replace(/%cmd/g, cmd)
                .replace(/%islimit/g, plugin.limit ? '◜⭐◞' : '')
                .replace(/%isPremium/g, plugin.premium ? '◜🪪◞' : '')
                .trim()
            }).join('\n')
          }),
          defaultMenu.footer
        ].join('\n')
      }),
      defaultMenu.after
    ].join('\n')

    let replace = {
      '%': '%',
      name,
      taguser,
      level,
      exp,
      xp,
      totalreg,
      readMore
    }

    let text = _text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join('|')})`, 'g'), (_, name) => replace[name])

    await conn.sendMessage(m.chat, { video: { url: vid[Math.floor(Math.random() * vid.length)] }, caption: text, mentions: [m.sender] }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Ocurrió un error al generar el menú.', m)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'allmenu', 'menú'] 
handler.register = true 
export default handler