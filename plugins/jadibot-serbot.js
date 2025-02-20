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

    // Si se genera un QR, enviamos la imagen del QR al chat
    if (qr) {
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