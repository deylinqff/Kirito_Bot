import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
let owner = `
┏━━━━━━━━━━⬣
┃ ✦ 𝐎𝐖𝐍𝐄𝐑𝐒 ✦
┗━━━━━━━━━━⬣
👑 *Comandos exclusivos para Moderadores*

╭━━⊷ *comandos medios* ⊶━━╮
┃ 💠 *#addcoins* - Añadir coins a un usuario.
┃ 💠 *#userpremium* - Otorgar premium a un usuario.
┃ 💠 *#delprem* - Quitar premium a un usuario.
┃ 💠 *#addexp* - Añadir XP a un usuario.
┃ 💠 *#autoadmin* - Admin automático si el bot es admin.
┃ 💠 *#listban* - Ver lista de baneados.
┃ 💠 *#banuser* - Banear a un usuario.
┃ 💠 *#unbanuser* - Desbanear a un usuario.
┃ 💠 *#block* / *#unblock* - Bloquear o desbloquear usuario.
┃ 💠 *#listblock* - Ver usuarios bloqueados.
┃ 💠 *#removecoin* - Quitar coins a un usuario.
┃ 💠 *#removexp* - Quitar XP a un usuario.
┃ 💠 *#deletedatauser* - Restablecer datos de usuario.
┃ 💠 *#cleartmp* - Limpiar archivos temporales.
┃ 💠 *#dsowner* - Eliminar archivos innecesarios de sesión.
╰━━━━━━━━━━━━━╯

╭━━⊷ *comandos avanzados* ⊶━━╮
┃ 🔥 *#addowner* / *#delowner* - Agregar o eliminar owner.
┃ 🔥 *#codigo* - Crear código de canjeo.
┃ 🔥 *#backup* - Respaldo de la DB del bot.
┃ 🔥 *#bcgc* - Mensaje a todos los grupos.
┃ 🔥 *#cleanfiles* - Eliminar archivos temporales.
┃ 🔥 *#newgc* - Crear un grupo con el bot.
┃ 🔥 *#deletefile* - Eliminar archivos del bot.
┃ 🔥 *#get* - Ver estado de una página web.
┃ 🔥 *#plugin* - Extraer un plugin del bot.
┃ 🔥 *#grouplist* - Ver grupos donde está el bot.
┃ 🔥 *#join* - Unir al bot a un grupo.
┃ 🔥 *#leave* - Sacar al bot de un grupo.
┃ 🔥 *#prefix* - Ver o cambiar prefijo del bot.
┃ 🔥 *#resetprefix* - Restablecer prefijo del bot.
┃ 🔥 *#reiniciar* - Reiniciar el servidor del bot.
┃ 🔥 *#reunion* - Aviso de reunión a los owners.
┃ 🔥 *#savejs* / *#saveplugin* - Guardar archivos en el bot.
┃ 🔥 *#setbanner* - Cambiar imagen del menú.
┃ 🔥 *#setcatalogo* - Cambiar imagen del catálogo.
┃ 🔥 *#addcmd* / *#delcmd* - Guardar o eliminar comandos personalizados.
┃ 🔥 *#cmdlist* - Ver lista de comandos guardados.
┃ 🔥 *#setimage* - Cambiar foto de perfil del bot.
┃ 🔥 *#setmoneda* - Cambiar la moneda del bot.
┃ 🔥 *#setname* - Cambiar nombre del bot.
┃ 🔥 *#setbio* - Cambiar biografía del bot.
┃ 🔥 *#update* - Actualizar bot desde GitHub.
╰━━━━━━━━━━━━━╯

💾 *Kirito-Bot* ⚔️ - Administración y control avanzado.
`;

await conn.sendMessage(m.chat, {
text: owner,
contextInfo: {
externalAdReply: {
title: 'Kirito-Bot ⚔️',
body: 'Administración y Control Avanzado',
thumbnailUrl: icono,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}
}
}, { quoted: m });
};

handler.help = ['mods'];
handler.tags = ['main'];
handler.command = ['mods', 'dev', 'owners'];
handler.mods = true;

export default handler;