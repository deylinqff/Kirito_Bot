import { useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import qrcode from 'qrcode';
import fs from 'fs';
import path from 'path';
import pino from 'pino';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Definir el ID del usuario
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let id = `${who.split`@`[0]}`;
  let pathKiritoJadiBot = path.join(`./kirito/`, id);

  // Crear la carpeta para el sub-bot si no existe
  if (!fs.existsSync(pathKiritoJadiBot)) {
    fs.mkdirSync(pathKiritoJadiBot, { recursive: true });
  }

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

    // Si es un nuevo QR, lo enviamos al usuario para que lo escanee
    if (qr) {
      if (m?.chat) {
        await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: "*☆𝗞𝗜𝗥𝗜𝗧𝗢 - 𝗕𝗢𝗧☆*\n\n✐ Escanea este QR para convertirte en un *Sub-Bot* Temporal." }, { quoted: m });
      }
    }

    // Si la conexión se abre
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