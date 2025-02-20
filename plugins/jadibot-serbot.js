import { useMultiFileAuthState, fetchLatestBaileysVersion, makeWASocket } from '@whiskeysockets/baileys';
import qrcode from 'qrcode';
import fs from 'fs';
import path from 'path';
import pino from 'pino';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let id = `${who.split`@`[0]}`;
  let pathKiritoJadiBot = path.join(`./kirito/`, id);

  if (!fs.existsSync(pathKiritoJadiBot)) {
    fs.mkdirSync(pathKiritoJadiBot, { recursive: true });
  }

  // Verifica si el comando tiene el argumento --code
  const isCodeRequested = args.includes('--code');

  // Obtener la versión más reciente de Baileys
  const { version } = await fetchLatestBaileysVersion();
  const { state } = await useMultiFileAuthState(pathKiritoJadiBot);

  const connectionOptions = {
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    auth: { creds: state.creds, keys: state.keys },
    version: [2, 3000, 1015901307],
    syncFullHistory: true,
    browser: ['Kirito-Bot (Sub Bot)', 'Chrome', '2.0.0'],
  };

  let sock = makeWASocket(connectionOptions);

  async function connectionUpdate(update) {
    const { connection, qr } = update;

    // Solo genera y envía el QR si el argumento --code fue pasado
    if (qr && isCodeRequested) {
      if (m?.chat) {
        // Convertir el QR en una imagen y enviarla al chat
        const qrImage = await qrcode.toBuffer(qr, { scale: 8 });
        await conn.sendMessage(m.chat, { image: qrImage, caption: "*☆𝗞𝗜𝗥𝗜𝗧𝗢 - 𝗕𝗢𝗧☆*\n\n✐ Escanea este QR para convertirte en un *Sub-Bot* Temporal." }, { quoted: m });
      }
    }

    // Si la conexión se abre, indicamos que el sub-bot está conectado
    if (connection === 'open') {
      console.log(`✅ Sub-Bot conectado exitosamente.`);
      await conn.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, ya eres un *Sub-Bot*.`, mentions: [m.sender] }, { quoted: m });
    }
  }

  sock.ev.on("connection.update", connectionUpdate);
};

handler.help = ['serbot'];
handler.tags = ['serbot'];
handler.command = ['serbot'];

export default handler;







import { useMultiFileAuthState, fetchLatestBaileysVersion, makeWASocket } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';
import pino from 'pino';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let id = `${who.split`@`[0]}`;
  let pathKiritoJadiBot = path.join(`./kirito/`, id);

  if (!fs.existsSync(pathKiritoJadiBot)) {
    fs.mkdirSync(pathKiritoJadiBot, { recursive: true });
  }

  // Obtener la versión más reciente de Baileys
  const { version } = await fetchLatestBaileysVersion();
  const { state } = await useMultiFileAuthState(pathKiritoJadiBot);

  const connectionOptions = {
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    auth: { creds: state.creds, keys: state.keys },
    version: [2, 3000, 1015901307],
    syncFullHistory: true,
    browser: ['Kirito-Bot (Sub Bot)', 'Chrome', '2.0.0'],
  };

  let sock = makeWASocket(connectionOptions);

  async function connectionUpdate(update) {
    const { connection, lastDisconnect, qr } = update;

    // Si el QR está disponible y se requiere un código, generamos un código de emparejamiento
    if (args[0] && /--code/.test(args[0].trim())) {
      if (qr) {
        let secret = await sock.requestPairingCode(m.sender.split`@`[0]);
        secret = secret.match(/.{1,4}/g)?.join("-");
        await conn.sendMessage(m.chat, { text: "*☆𝗞𝗜𝗥𝗜𝗧𝗢 - 𝗕𝗢𝗧☆*\n\n✐ Usa este código para ser *Sub-Bot* Temporal:" }, { quoted: m });
        await m.reply(secret);  // Enviar el código de emparejamiento
      }
    }

    // Si la conexión se abre, indicamos que el sub-bot está conectado
    if (connection === 'open') {
      console.log(`✅ Sub-Bot conectado exitosamente.`);
      await conn.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, ya eres un *Sub-Bot*.`, mentions: [m.sender] }, { quoted: m });
    }
  }

  sock.ev.on("connection.update", connectionUpdate);
};

handler.help = ['serbot'];
handler.tags = ['serbot'];
handler.command = ['serbot --code'];

export default handler;