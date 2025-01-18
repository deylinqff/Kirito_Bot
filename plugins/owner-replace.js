/* Código creado por @Deyin */

import { readdirSync, readFileSync, writeFileSync, existsSync, promises as fs } from 'fs';
import path from 'path';

var handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(
      m.chat,
      '👑 *Utiliza este comando directamente en el número principal del Bot*',
      m,
      rcanal
    );
  }

  await conn.reply(
    m.chat,
    '⚡ *Iniciando proceso de reemplazo de emojis en los archivos...*',
    m,
    rcanal
  );
  m.react(rwait);

  let folderPath = `./${sessions}/`; // Cambia esto si tu carpeta no es "sessions"

  try {
    if (!existsSync(folderPath)) {
      return await conn.reply(m.chat, '👑 *La carpeta está vacía*', m, rcanal);
    }

    let files = readdirSync(folderPath);
    let filesModified = 0;

    for (const file of files) {
      let filePath = path.join(folderPath, file);
      if (file !== 'creds.json') {
        let content = readFileSync(filePath, 'utf-8');
        // Reemplazar los emojis 🍭 y 🍬
        let newContent = content.replace(/🍭/g, '⚡').replace(/🍬/g, '👑');

        if (content !== newContent) {
          writeFileSync(filePath, newContent, 'utf-8');
          filesModified++;
        }
      }
    }

    if (filesModified === 0) {
      await conn.reply(
        m.chat,
        '👑 *No se encontraron emojis para reemplazar en los archivos.*',
        m,
        rcanal
      );
    } else {
      m.react(done);
      await conn.reply(
        m.chat,
        `⚡ *Se modificaron ${filesModified} archivos reemplazando los emojis por ⚡ y 👑*`,
        m,
        rcanal
      );
    }
  } catch (err) {
    console.error('Error al leer o modificar los archivos:', err);
    await conn.reply(m.chat, '⚠️ *Ocurrió un fallo durante el proceso*', m, rcanal);
  }
};

handler.help = ['repla'];
handler.tags = ['owner'];
handler.command = ['delai', 'delyuki', 'repla', 'clearallsession'];

handler.rowner = true;

export default handler;