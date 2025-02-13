import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let bio = 0, fechaBio
  let sinDefinir = '😿 Es privada'
  let biografia = await conn.fetchStatus(m.sender).catch(() => null)
  
  if (!biografia || !biografia[0] || biografia[0].status === null) {
    bio = sinDefinir
    fechaBio = "Fecha no disponible"
  } else {
    bio = biografia[0].status || sinDefinir
    fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Fecha no disponible"
  }
  
  let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  
  if (user.registered === true) return m.reply(`❌ Ya estás registrado.\n\n*¿Quieres volver a registrarte?*\n\nUsa este comando para eliminar tu registro:\n*${usedPrefix}unreg*`)
  
  if (!Reg.test(text)) return m.reply(`⚠️ Formato incorrecto.\n\nUso del comando: *${usedPrefix + command} nombre.edad*\nEjemplo: *${usedPrefix + command} ${name2}.18*`)
  
  let [_, name, , age] = text.match(Reg)
  
  if (!name) return m.reply(`⚠️ El nombre no puede estar vacío.`)
  if (!age) return m.reply(`⚠️ La edad no puede estar vacía.`)
  if (name.length >= 100) return m.reply(`⚠️ El nombre es demasiado largo.`)
  
  age = parseInt(age)
  if (age > 1000) return m.reply(`😂 Wow, el abuelo quiere jugar al bot.`)
  if (age < 5) return m.reply(`👶 ¡Un bebé quiere jugar al bot!`)

  user.name = name + '✓'.trim()
  user.age = age
  user.descripcion = bio 
  user.regTime = +new Date      
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20
  
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `✨ 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗔 𝗗 𝗢 ✨\n`
  regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
  regbot += `「☁️」𝗡𝗼𝗺𝗯𝗿𝗲 » ${name}\n`
  regbot += `「🪐」𝗘𝗱𝗮𝗱 » ${age} años\n`
  regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
  regbot += `「🎁」 𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:\n`
  regbot += `> • 💸 *Monedas* » 40\n`
  regbot += `> • ✨ *Experiencia* » 300\n`
  regbot += `> • ⚜️ *Tokens* » 20\n`
  regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
  regbot += `> 𝑻𝑬𝑪𝑵𝑶-𝑩𝑶𝑻©®`

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

  let notification = `✧ *Nuevo Usuario Verificado* ✧\n\n`
  notification += `👤 *Usuario:* ${m.pushName || 'Anónimo'}\n`
  notification += `📝 *Verificado como:* ${user.name}\n`
  notification += `🎂 *Edad:* ${user.age} años\n`
  notification += `📄 *Descripción:* ${user.descripcion}\n`
  notification += `📅 *Última modificación:* ${fechaBio}\n`
  notification += `📌 *Fecha de registro:* ${new Date().toLocaleDateString("es-ES")}\n`
  notification += `🔢 *ID de Registro:* ${sn}`

  await conn.sendMessage(global.idchannel, { text: notification, contextInfo: {
    externalAdReply: {
      title: '✧ Usuario Verificado ✧',
      body: '🥳 ¡Un nuevo usuario ha sido registrado!',
      thumbnailUrl: perfil,
      sourceUrl: channel,
      mediaType: 1,
      showAdAttribution: true,
      renderLargerThumbnail: true
    }
  }}, { quoted: null })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler