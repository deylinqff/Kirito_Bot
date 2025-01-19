import fetch from 'node-fetch'

export async function before(m, { conn }) {
let name = '🚀𝑻𝒆𝒄𝒏𝒐 - 𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍🚀'
let imagenes = ["https://files.catbox.moe/w6xtbb.jpg",
"https://files.catbox.moe/8qyr7g.jpg",
"https://files.catbox.moe/j2chet.jpg",
"https://files.catbox.moe/eu1j1n.jpg",
"https://files.catbox.moe/7h7syw.jpg",
"https://files.catbox.moe/ba0iky.jpg",
"https://files.catbox.moe/2p85hb.jpg"]

let icono = imagenes[Math.floor(Math.random() * imagenes.length)]


global.rcanal = {
 contextInfo: {
             isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363365444927738@newsletter",
      serverMessageId: 100,
      newsletterName: name,
   }, 
   externalAdReply: {
    showAdAttribution: true, 
    title: botname, 
    body: textbot, 
    mediaUrl: null, 
    description: null, 
    previewType: "PHOTO", 
    thumbnailUrl: icono, 
    sourceUrl: canal, 
    mediaType: 1, 
    renderLargerThumbnail: false }, 
    }, 
    }

 global.fake = {
    contextInfo: {
            isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363365444927738@newsletter",
      serverMessageId: 100,
      newsletterName: name,
    },
    },
  }
}