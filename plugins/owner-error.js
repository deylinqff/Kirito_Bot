import { execSync } from 'child_process';

var handler = async (m, { conn }) => {
  m.react('🚀');

  try {
    let logs;

    try {
      // Intentar obtener los últimos errores con journalctl (para sistemas Linux con systemd)
      logs = execSync('journalctl -u tu-bot.service --no-pager --lines=20 -o cat 2>&1').toString();
    } catch {
      try {
        // Si falla, intenta con PM2
        logs = execSync('pm2 logs --nostream --lines 20 2>&1').toString();
      } catch {
        logs = '⚠️ No se pudieron obtener los errores del servidor.';
      }
    }

    if (!logs.trim()) {
      conn.reply(m.chat, '✅ No se encontraron errores recientes en la consola.', m);
      return;
    }

    conn.reply(m.chat, `⚠️ Últimos errores de la consola del servidor:\n\n${logs}`, m);

  } catch (error) {
    conn.reply(m.chat, `⚠️ No se pudieron analizar los errores.\nError: ${error.message}`, m);
  }
};

handler.help = ['errorcon'];
handler.tags = ['owner'];
handler.command = ['errorcon'];
handler.rowner = true;

export default handler;