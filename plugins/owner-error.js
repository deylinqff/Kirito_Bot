import { execSync } from 'child_process';

var handler = async (m, { conn }) => {
  m.react('🚀');

  try {
    const stderr = execSync('node -c . 2>&1 || true').toString();

    if (!stderr.trim()) {
      conn.reply(m.chat, '✅ No se encontraron errores en el código.', m);
      return;
    }

    const errors = stderr.split('\n').filter(line => line.includes(':'));
    const errorMessages = errors.map(error => {
      const match = error.match(/(.+):(\d+):(\d+): (.+)/);
      if (match) {
        const [, file, line, column, message] = match;
        return `*Archivo:* ${file}\n*Línea:* ${line}, *Columna:* ${column}\n*Error:* ${message}`;
      }
      return `*Error sin formato:* ${error}`;
    }).join('\n\n');

    conn.reply(m.chat, `⚠️ Se encontraron errores en el código:\n\n${errorMessages}`, m);

  } catch (error) {
    conn.reply(m.chat, `⚠️ No se pudieron analizar los errores.\nError: ${error.message}`, m);
  }
};

handler.help = ['errorcon'];
handler.tags = ['owner'];
handler.command = ['errorcon'];
handler.rowner = true;

export default handler;