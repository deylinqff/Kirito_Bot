const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode";
import NodeCache from "node-cache";
import fs from "fs";
import path from "path";
import pino from 'pino';
import chalk from 'chalk';
import util from 'util';
import * as ws from 'ws';
const { child, spawn, exec } = await import('child_process');
const { CONNECTING } = ws;
import { makeWASocket } from '../lib/simple.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const kiritoJBOptions = {};

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  let time = global.db.data.users[m.sender].Subs + 120000;
  if (new Date() - global.db.data.users[m.sender].Subs < 120000)
    return conn.reply(m.chat, `Debes esperar ${msToTime(time - new Date())} para volver a vincular un *Sub-Bot*.`, m);

  if (Object.values(global.conns).length === 30) {
    return m.reply(`No se han encontrado espacios para *Sub-Bots* disponibles.`);
  }

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let id = `${who.split`@`[0]}`;
  let pathKiritoJadiBot = path.join(`./kirito/`, id);

  if (!fs.existsSync(pathKiritoJadiBot)) {
    fs.mkdirSync(pathKiritoJadiBot, { recursive: true });
  }

  kiritoJBOptions.pathKiritoJadiBot = pathKiritoJadiBot;
  kiritoJBOptions.m = m;
  kiritoJBOptions.conn = conn;
  kiritoJBOptions.args = args;
  kiritoJBOptions.usedPrefix = usedPrefix;
  kiritoJBOptions.command = command;
  
  kiritoJadiBot(kiritoJBOptions);
  global.db.data.users[m.sender].Subs = new Date() * 1;
};

handler.help = ['serbot', 'serbot code'];
handler.tags = ['serbot'];
handler.command = ['jadibot', 'serbot'];
export default handler;

export async function kiritoJadiBot(options) {
  let { pathKiritoJadiBot, m, conn, args, usedPrefix, command } = options;
  const mcode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : args[1] && /(--code|code)/.test(args[1].trim()) ? true : false;

  const pathCreds = path.join(pathKiritoJadiBot, "creds.json");
  if (!fs.existsSync(pathKiritoJadiBot)) {
    fs.mkdirSync(pathKiritoJadiBot, { recursive: true });
  }

  try {
    if (args[0] && args[0] !== undefined) {
      fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t'));
    }
  } catch {
    conn.reply(m.chat, `Use correctamente el comando » ${usedPrefix + command} code`, m);
    return;
  }

  let { version } = await fetchLatestBaileysVersion();
  const msgRetryCache = new NodeCache();
  const { state, saveState, saveCreds } = await useMultiFileAuthState(pathKiritoJadiBot);

  const connectionOptions = {
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })) },
    msgRetryCache,
    version: [2, 3000, 1015901307],
    syncFullHistory: true,
    browser: mcode ? ['Ubuntu', 'Chrome', '110.0.5585.95'] : ['Kirito-Bot (Sub Bot)', 'Chrome', '2.0.0'],
  };

  let sock = makeWASocket(connectionOptions);
  sock.isInit = false;
  let isInit = true;

  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin, qr } = update;
    
    if (isNewLogin) sock.isInit = false;
    
    if (qr && !mcode) {
      if (m?.chat) {
        await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: "*☆𝗞𝗜𝗥𝗜𝗧𝗢 - 𝗕𝗢𝗧☆*\n\n✐ Escanea este QR para convertirte en un *Sub-Bot* Temporal." }, { quoted: m });
      }
      return;
    }
    
    if (qr && mcode) {
      let secret = await sock.requestPairingCode(m.sender.split`@`[0]);
      secret = secret.match(/.{1,4}/g)?.join("-");
      await conn.sendMessage(m.chat, { text: "*☆𝗞𝗜𝗥𝗜𝗧𝗢 - 𝗕𝗢𝗧☆*\n\n✐ Usa este código para ser *Sub-Bot* Temporal." }, { quoted: m });
      await m.reply(secret);
    }

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
      if ([428, 408, 440, 405, 401, 500, 515, 403].includes(reason)) {
        console.log(`Conexión cerrada para ${path.basename(pathKiritoJadiBot)}.`);
        fs.rmdirSync(pathKiritoJadiBot, { recursive: true });
      }
    }

    if (connection === 'open') {
      let userName = sock.authState.creds.me.name || 'Anónimo';
      console.log(`✅ ${userName} (+${path.basename(pathKiritoJadiBot)}) conectado exitosamente.`);
      sock.isInit = true;
      global.conns.push(sock);
      await conn.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, ya eres un *Sub-Bot*.`, mentions: [m.sender] }, { quoted: m });
    }
  }

  sock.ev.on("connection.update", connectionUpdate);
}