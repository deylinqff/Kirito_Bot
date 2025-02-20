import { useMultiFileAuthState, makeWASocket, fetchLatestBaileysVersion, jidNormalizedUser } from '@whiskeysockets/baileys';
import pino from 'pino';
import readline from 'readline';
import fs from 'fs';
import NodeCache from 'node-cache';
import { makeCacheableSignalKeyStore } from '@whiskeysockets/baileys';
import { DisconnectReason, MessageRetryMap } from '@whiskeysockets/baileys';

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
  const bot = global.db.data.settings[conn.user.jid] || {};
  
  if (!bot.jadibotmd) return m.reply('⚠️ **¡Comando Desactivado!** Este comando está desactivado por mi creador.');

  let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn;

  // Función que maneja la conexión del bot
  async function serbot() {
    let authFolderB = m.sender.split('@')[0];
    const userFolderPath = `./CrowKiritoBot/${authFolderB}`;

    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    if (args[0]) fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t'));

    const { state, saveState, saveCreds } = await useMultiFileAuthState(userFolderPath);
    const msgRetryCounterMap = MessageRetryMap;
    const msgRetryCounterCache = new NodeCache();
    const { version } = await fetchLatestBaileysVersion();
    let phoneNumber = m.sender.split('@')[0];

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      mobile: true,
      browser: ["KiritoBot", "Chrome", "1.0"],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (clave) => {
        let jid = jidNormalizedUser(clave.remoteJid);
        let msg = await store.loadMessage(jid, clave.id);
        return msg?.message || "";
      },
      msgRetryCounterCache,
      msgRetryCounterMap,
      version
    };

    let conn = makeWASocket(connectionOptions);

    if (args[0] && !conn.authState.creds.registered) {
      if (!phoneNumber) process.exit(0);
      let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
      setTimeout(async () => {
        let codeBot = await conn.requestPairingCode(cleanedNumber);
        codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
        let txt = `*¡Hola, ${m.sender.split('@')[0]}! Aquí está tu código para activar el Kirito-Bot!*\n\n`
        txt += `🎯 *Pasos:*\n`
        txt += `1️⃣ Abre WhatsApp y ve a la opción de *"Dispositivos Vinculados"*.\n`
        txt += `2️⃣ Toca la opción *"Vincular con número"*.\n`
        txt += `3️⃣ Introduce el siguiente código en tu WhatsApp:\n>`
        txt += `✨ *Recuerda:* Este código solo es válido para el número registrado.\n`
        await parent.reply(m.chat, txt, m);
        await parent.reply(m.chat, codeBot, m);
      }, 3000);
    }

    conn.isInit = false;

    let isInit = true;

    // Actualización de conexión
    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update;
      if (isNewLogin) conn.isInit = true;

      if (connection === 'open') {
        conn.isInit = true;
        global.conns.push(conn);
        await parent.reply(m.chat, '✅ *Conexión Establecida con Éxito*', m);
      }
    }

    setInterval(async () => {
      if (!conn.user) {
        try { conn.ws.close() } catch { }
        conn.ev.removeAllListeners();
        let i = global.conns.indexOf(conn);
        if (i < 0) return;
        delete global.conns[i];
        global.conns.splice(i, 1);
      }
    }, 60000);

    // Recargar el handler
    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
      } catch (e) {
        console.error(e);
      }

      if (restatConn) {
        try { conn.ws.close() } catch { }
        conn.ev.removeAllListeners();
        conn = makeWASocket(connectionOptions);
        isInit = true;
      }

      if (!isInit) {
        conn.ev.off('messages.upsert', conn.handler);
        conn.ev.off('connection.update', conn.connectionUpdate);
        conn.ev.off('creds.update', conn.credsUpdate);
      }

      conn.handler = handler.handler.bind(conn);
      conn.connectionUpdate = connectionUpdate.bind(conn);
      conn.credsUpdate = saveCreds.bind(conn, true);

      conn.ev.on('messages.upsert', conn.handler);
      conn.ev.on('connection.update', conn.connectionUpdate);
      conn.ev.on('creds.update', conn.credsUpdate);
      isInit = false;
      return true;
    };
    creloadHandler(false);
  }

  serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'Code', 'serbot'];
handler.rowner = false;

export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}