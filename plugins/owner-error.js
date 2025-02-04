import { execSync } from 'child_process';

var handler = async (m, { conn }) => {
  m.react('🚀');

  try {
    let consoleErrors = '⚠️ No se pudieron obtener los errores de la consola.';
    let repoErrors = '⚠️ No se encontraron errores en los archivos del repositorio.';

    // 1. Buscar errores recientes en la consola del servidor
    try {
      consoleErrors = execSync('journalctl -u tu-bot.service --no-pager --lines=20 -o cat 2>&1 || tail -n 20 /var/log/syslog').toString();
    } catch {
      try {
        consoleErrors = execSync('tail -n 20 nohup.out 2>&1 || true').toString();
      } catch {
        consoleErrors = '⚠️ No se pudieron obtener los errores de la consola.';
      }
    }

    // 2. Buscar errores en los archivos del repositorio
    try {
      repoErrors = execSync('grep -r -n "Error" . --exclude-dir=node_modules --exclude-dir=.git --exclude=package-lock.json 2>&1 || true').toString();
    } catch {
      repoErrors = '⚠️ No se encontraron errores en los archivos del repositorio.';
    }

    let response = '⚠️ *Reporte de errores:*\n\n';

    if (consoleErrors.trim() && !consoleErrors.includes('No se pudieron obtener')) {
      response += `🔴 *Errores en la consola del servidor:*\n${consoleErrors}\n\n`;
    } else {
      response += '✅ No hay errores en la consola del servidor.\n\n';
    }

    if (repoErrors.trim() && !repoErrors.includes('No se encontraron')) {
      response += `🔵 *Errores en los archivos del repositorio:*\n${repoErrors}\n\n`;
    } else {
      response += '✅ No se encontraron errores en los archivos del repositorio.\n\n';
    }

    conn.reply(m.chat, response, m);
  } catch (error) {
    conn.reply(m.chat, `⚠️ Ocurrió un error al obtener los errores.\nError: ${error.message}`, m);
  }
};

handler.help = ['errorcon'];
handler.tags = ['owner'];
handler.command = ['errorcon'];
handler.rowner = true;

export default handler;