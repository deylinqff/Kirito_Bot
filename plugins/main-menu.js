import { promises as fs } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

const generarEstilo = (texto) => {
  const caracteres = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const estilo = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890';
  return texto.toLowerCase().split('').map(char => {
    const index = caracteres.indexOf(char);
    return index !== -1 ? estilo[index] : char;
  }).join('');
};

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

const generarSaludo = () => {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return '🌞 ¡Buenos días!';
  if (hora >= 12 && hora < 18) return '🌤 ¡Buenas tardes!';
  return '🌙 ¡Buenas noches!';
};

const formatoMenu = {
  antes: `╔══❖•ೋ°⚔️°ೋ•❖══╗
  🌟 *Bienvenido a KIRITO-BOT* 🌟
  ╚══❖•ೋ°⚔️°ೋ•❖══╝

  ${generarSaludo()}, *%name*.
  🤖 *Estado:* %modo
  📊 *Nivel:* %nivel
  🏆 *Experiencia:* %exp / %maxexp
  👥 *Usuarios registrados:* %totalreg

  🌟 _¡Explora los comandos disponibles!_ 🌟
  `,
  cabecera: '⚡ *%categoria* ⚡',
  cuerpo: '🔹 %cmd %isLimit %isPremium',
  pie: '──────────────────────',
  despues: '🔥 *By DEYLIN* 🔥',
};

const handler = async (m, { conn, usedPrefix }) => {
  try {
    const usuario = global.db.data.users[m.sender];
    const { exp, level } = usuario;
    const { min, xp, max } = xpRange(level, global.multiplier);
    const nombre = await conn.getName(m.sender);
    const totalUsuarios = Object.keys(global.db.data.users).length;
    const modo = global.opts['self'] ? 'Privado' : 'Público';

    const comandos = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        ayuda: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
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
      .replace(/%totalreg/g, totalUsuarios);

    for (let categoria in categorias) {
      const comandosFiltrados = comandos.filter(cmd => cmd.categorias.includes(categoria));
      if (comandosFiltrados.length > 0) {
        menuTexto += `\n\n${formatoMenu.cabecera.replace(/%categoria/g, categorias[categoria])}\n`;
        comandosFiltrados.forEach(cmd => {
          cmd.ayuda.forEach(help => {
            menuTexto += `\n${formatoMenu.cuerpo
              .replace(/%cmd/g, usedPrefix + help)
              .replace(/%isLimit/g, cmd.limite)
              .replace(/%isPremium/g, cmd.premium)}`;
          });
        });
        menuTexto += `\n${formatoMenu.pie}`;
      }
    }

    menuTexto += `\n\n${formatoMenu.despues}`;

    const imagenURL = 'https://files.catbox.moe/80uwhc.jpg';
    await conn.sendFile(m.chat, imagenURL, 'menu.jpg', menuTexto.trim(), m);
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