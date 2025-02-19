import { promises as fs } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

const categorias = {
  'anime': '🌸 ANIME',
  'main': '📌 INFO',
  'search': '🔍 BÚSQUEDA',
  'game': '🎮 JUEGOS',
  'serbot': '🤖 SUB BOTS',
  'rpg': '⚔️ RPG',
  'sticker': '🎭 STICKERS',
  'group': '👥 GRUPOS',
  'premium': '💎 PREMIUM',
  'downloader': '📥 DESCARGAS',
  'tools': '🛠️ HERRAMIENTAS',
  'fun': '🎉 DIVERSIÓN',
  'nsfw': '🔞 NSFW',
  'cmd': '📂 BASE DE DATOS',
  'owner': '👑 ADMIN',
  'audio': '🎵 AUDIOS',
  'advanced': '🚀 AVANZADO',
};

const emojisCategorias = {
  'anime': '🎴',
  'main': '📌',
  'search': '🔎',
  'game': '🕹️',
  'serbot': '🤖',
  'rpg': '⚔️',
  'sticker': '🎭',
  'group': '👥',
  'premium': '💎',
  'downloader': '📥',
  'tools': '🛠️',
  'fun': '🎉',
  'nsfw': '🔞',
  'cmd': '📂',
  'owner': '👑',
  'audio': '🎶',
  'advanced': '🚀',
};

const generarSaludo = () => {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return '🌞 ¡Buenos días!';
  if (hora >= 12 && hora < 18) return '🌤 ¡Buenas tardes!';
  return '🌙 ¡Buenas noches!';
};

const formatoMenu = {
  antes: `╔══════════════════╗\n   *Bienvenido a KIRITO-BOT*\n╚══════════════════╝

✎ ${generarSaludo()}, *%name*.

╔═══════ೋೋ═══════☾
║┏◆━━━━━━◆❃◆━━━━━━◆
║┃ 🤖 *Modo:* %modo
║┃ 📊 *Nivel:* %nivel
║┃ 🏆 *Experiencia:* %exp / %maxexp
║┃ 👥 *Usuarios registrados:* %totalreg
║┗◆━━━━━━◆❃◆━━━━━━◆
╚═══════ೋೋ═══════☾
%readmore
  ───────────────`,
  cabecera: '┏━☾➥ *%categoria* ««✰',
  cuerpo: '┃%emoji %cmd %isLimit %isPremium',
  pie: '┗━━«✰»━━━━«✰»━━━━«✰»━━┛',
  despues: '🔥 *By DEYLIN* 🔥',
};

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const handler = async (m, { conn, usedPrefix }) => {
  try {
    const usuario = global.db.data.users[m.sender];
    if (!usuario) {
      return conn.reply(m.chat, '❌ No estás registrado en la base de datos.', m);
    }

    const { exp = 0, level = 1 } = usuario;
    const { min, xp, max } = xpRange(level, global.multiplier || 1);
    const nombre = (await conn.getName(m.sender)) || 'Usuario';
    const totalUsuarios = Object.keys(global.db.data.users || {}).length;
    const modo = global.opts['self'] ? 'Privado' : 'Público';

    if (!global.plugins) {
      return conn.reply(m.chat, '❌ Error: No se encontraron comandos.', m);
    }

    const comandos = Object.values(global.plugins)
      .filter(plugin => plugin && !plugin.disabled)
      .map(plugin => ({
        ayuda: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        categorias: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        limite: plugin.limit ? '🛑' : '',
        premium: plugin.premium ? '💎' : '',
      }));

    let menuTexto = formatoMenu.antes
      .replace(/%name/g, nombre)
      .replace(/%modo/g, modo)
      .replace(/%nivel/g, level)
      .replace(/%exp/g, exp - min)
      .replace(/%maxexp/g, xp)
      .replace(/%totalreg/g, totalUsuarios)
      .replace(/%readmore/g, readMore);

    for (let categoria in categorias) {
      const comandosFiltrados = comandos.filter(cmd => cmd.categorias.includes(categoria));
      if (comandosFiltrados.length > 0) {
        menuTexto += `\n\n${formatoMenu.cabecera.replace(/%categoria/g, categorias[categoria])}\n`;
        comandosFiltrados.forEach(cmd => {
          cmd.ayuda.forEach(help => {
            menuTexto += `\n${formatoMenu.cuerpo
              .replace(/%cmd/g, usedPrefix + help)
              .replace(/%isLimit/g, cmd.limite)
              .replace(/%isPremium/g, cmd.premium)
              .replace(/%emoji/g, emojisCategorias[categoria] || '🔹')}`;
          });
        });
        menuTexto += `\n${formatoMenu.pie}`;
      }
    }

    menuTexto += `\n\n${formatoMenu.despues}`;

    const imagenURL = 'https://files.catbox.moe/80uwhc.jpg', 'https://files.catbox.moe/hyrmn9.jpg', 'https://files.catbox.moe/0tv7r3.jpg', 'https://files.catbox.moe/yiaw4a.jpg';
    await conn.sendFile(m.chat, imagenURL, 'menu.jpg', menuTexto.trim(), m);
  } catch (error) {
    console.error('Error en el menú:', error);
    conn.reply(m.chat, '❌ Error al generar el menú.', m);
  }
};

handler.help = ['menu', 'allmenu'];
handler.tags = ['main'];
handler.command = ['menu', 'allmenu', 'menú'];
handler.register = true;

export default handler;