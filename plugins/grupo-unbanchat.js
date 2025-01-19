let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '🔴 *¡ESTE CHAT NO ESTÁ REGISTRADO!*', m, fake)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, '⭕ *¡KIRITO-BOT NO ESTÁ BANEADO EN ESTE CHAT!*', m, fake)
chat.isBanned = false
await conn.reply(m.chat, '👑 *¡KIRITO-BOT YA FUÉ DESBANEADO EN ESTE CHAT!*', m, fake)
}
handler.help = ['unbanchat'];
handler.tags = ['mods'];
handler.command = ['unbanchat','desbanearchat','desbanchat']
handler.rowner = true 
//handler.group = true

export default handler