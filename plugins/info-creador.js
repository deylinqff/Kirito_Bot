import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  m.react('👑')

  // Verifica si el mensaje menciona a alguien, de lo contrario, usa el emisor del mensaje
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

  // Obtener la foto de perfil
  let pp = await conn.profilePictureUrl(who).catch(_ => 'https://files.catbox.moe/3kbbok.jpg')

  // Obtener biografía de la persona y el bot
  let biografia = await conn.fetchStatus('50488198573' + '@s.whatsapp.net').catch(_ => 'Sin Biografía')
  let biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}` + '@s.whatsapp.net').catch(_ => 'Sin Biografía')

  // Extrae la biografía o usa un valor por defecto si no existe
  let bio = biografia.status?.toString() || 'Sin Biografía'
  let biobot = biografiaBot.status?.toString() || 'Sin Biografía'

  // Obtener nombre del contacto mencionado
  let name = await conn.getName(who)

  // Definir variables para el propietario y el bot
  let nomorown = '50488198573' // Número del propietario
  let dev = 'Deyin' // Nombre del propietario

  // Llamar a la función para enviar la información de contacto
  await sendContactArray(conn, m.chat, [
    [`${nomorown}`, `👑 Propietario`, `🚀 𝑫𝒆𝒚𝒍𝒊𝒏`, dev, 'Deylibaqudano40@gmail.com', ` 𝑯𝒐𝒏𝒅𝒖𝒓𝒂𝒔 🇭🇳`, `https://github.com/deylinqff`, bio],
    [`${conn.user.jid.split('@')[0]}`, `Es Un Bot 🍬`, `${packname}`, `📵 No Hacer Spam`, 'moisesmusic04@gmail.com', `🇨🇴 Colombia`, `https://github.com/deylinqff/Kirito_Bot`, biobot]
  ], m)
}

handler.help = ["creador", "owner"]
handler.tags = ["info"]
handler.command = ['creador', 'owner']

export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
  let contacts = []
  for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
    number = number.replace(/[^0-9]/g, '')
    let njid = number + '@s.whatsapp.net'
    let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {}
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:🏷 Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim()
    contacts.push({ vcard, displayName: name })
  }
  return await conn.sendMessage(jid, {
    contacts: {
      displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
      contacts,
    }
  },
  {
    quoted,
    ...options
  })
}