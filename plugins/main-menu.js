import { xpRange } from '../lib/levelling.js';

const handler = async (m, { conn, usedPrefix }) => {
  try {
    const usuario = global.db.data.users[m.sender] || {};
    const { exp = 0, level = 0 } = usuario;
    const { min, xp } = xpRange(level, global.multiplier || 1);
    let nombre;
    try {
      nombre = await conn.getName(m.sender);
    } catch {
      nombre = 'Usuario';
    }
    const totalUsuarios = Object.keys(global.db.data.users || {}).length;
    const modo = global.opts?.self ? '🔒 *Privado*' : '🌎 *Público*';

    let menuTexto = `╭══•*💠*•══╮
        ✨ *KIRITO-BOT* ✨  
╰══•*💠*•══╯

╭━━━━━━━━━━━━━⬣
┃ 👤 *Usuario:* ${nombre}
┃ 🔰 *Modo:* ${modo}
┃ 📊 *Nivel:* ${level}
┃ 🏆 *Exp:* ${exp - min} / ${xp}
┃ 👥 *Usuarios:* ${totalUsuarios}
╰━━━━━━━━━━━━━⬣

╭═══•〈 🔹 *MENÚ DE COMANDOS* 🔹 〉•═══╮`;

    for (let categoria in categorias) {
      const comandosFiltrados = Object.values(global.plugins || {}).filter(
        (plugin) => !plugin.disabled && (plugin.tags || []).includes(categoria)
      );

      if (comandosFiltrados.length > 0) {
        menuTexto += `\n│ 🎭 *${categorias[categoria]}* 🎭\n│═══════════════════⬣\n`;
        comandosFiltrados.forEach((cmd) => {
          (cmd.help || []).forEach((help) => {
            menuTexto += `│ ➤ *${usedPrefix + help}* ${cmd.limit ? '🛑' : ''} ${cmd.premium ? '💎' : ''}\n`;
          });
        });
      }
    }

    menuTexto += `╰═══•〈 🚀 *By Deylin* 🚀 〉•═══╯`;

    const imagenURL = 'https://files.catbox.moe/80uwhc.jpg';
    await conn.sendMessage(m.chat, { image: { url: imagenURL }, caption: menuTexto.trim() }, { quoted: m });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '❌ Error al generar el menú.', m);
  }
};

handler.help = ['menu', 'allmenu'];
handler.tags = ['main'];
handler.command = ['menu', 'allmenu', 'menú'];
handler.register = true;

export default handler;