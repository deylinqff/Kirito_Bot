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
    const modo = global.opts?.self ? 'Privado' : 'Público';

    const comandos = Object.values(global.plugins || {}).filter(plugin => !plugin.disabled).map(plugin => ({
      ayuda: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      categorias: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      limite: plugin.limit ? '🛑' : '',
      premium: plugin.premium ? '💎' : '',
    }));

    let menuTexto = `🌟 *Bienvenido a KIRITO-BOT* 🌟\n\n`;
    menuTexto += `🌟 Hola, *${nombre}*.\n`;
    menuTexto += `🤖 *Modo:* ${modo}\n`;
    menuTexto += `📊 *Nivel:* ${level}\n`;
    menuTexto += `🏆 *Exp:* ${exp - min} / ${xp}\n`;
    menuTexto += `👥 *Usuarios registrados:* ${totalUsuarios}\n`;

    for (let categoria in categorias) {
      const comandosFiltrados = comandos.filter(cmd => cmd.categorias.includes(categoria));
      if (comandosFiltrados.length > 0) {
        menuTexto += `\n⚡ *${categorias[categoria]}* ⚡\n`;
        comandosFiltrados.forEach(cmd => {
          cmd.ayuda.forEach(help => {
            menuTexto += `🔹 ${usedPrefix + help} ${cmd.limite} ${cmd.premium}\n`;
          });
        });
      }
    }

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