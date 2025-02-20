/*⚠️ PROHIBIDO EDITAR ⚠️
Este código fue modificado, adaptado y mejorado por

TuNombre >> https://github.com/TuNombre
El código de este archivo está inspirado en el código original de:

OriginalCreator >> https://github.com/OriginalCreator
El archivo original fue liberado en mayo de 2024.
*/

import { useMultiFileAuthState, fetchLatestBaileysVersion, makeWASocket } from '@whiskeysockets/baileys';
import qrcode from 'qrcode';
import fs from 'fs';
import path from 'path';
import pino from 'pino';
import { exec } from 'child_process';

const { CONNECTING } = require('ws');
const customBotName = "☆𝗕𝗢𝗧 𝗕𝗨𝗦𝗜𝗡𝗘𝗦☆";
const qrText = "Para convertirte en un Sub-Bot temporal, escanea este código QR.";

let crmString = "Q2FkZXJlYSBFcXVpcG8=";

const pathBotData = path.join(__dirname, 'bot_data');
const credsFilePath = path.join(pathBotData, 'creds.json');

if (!fs.existsSync(pathBotData)) {
  fs.mkdirSync(pathBotData, { recursive: true });
}

async function setupBotSession(m, conn) {
  const userId = m.sender;
  const pathForUser = path.join(pathBotData, userId);

  if (!fs.existsSync(pathForUser)) {
    fs.mkdirSync(pathForUser, { recursive: true });
  }

  const credsPath = path.join(pathForUser, 'creds.json');
  if (args[0]) {
    try {
      fs.writeFileSync(credsPath, JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, '\t'));
    } catch {
      conn.reply(m.chat, `Uso incorrecto del comando. Usa: ${usedPrefix + command} code`, m);
      return;
    }
  }

  const { version, isLatest } = await fetchLatestBaileysVersion();
  const { state, saveState, saveCreds } = await useMultiFileAuthState(pathForUser);

  const connectionOptions = {
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    auth: { creds: state.creds },
    version: [2, 3000, 1015901307],
    syncFullHistory: true,
    browser: ['Bot-Sub', 'Chrome', '2.0.0'],
  };

  let sock = makeWASocket(connectionOptions);

  sock.isInit = false;

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, isNewLogin, qr } = update;

    if (isNewLogin) sock.isInit = false;

    if (qr) {
      conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: qrText.trim() }, { quoted: m });
    }

    if (connection === 'close' && lastDisconnect?.error?.output?.statusCode === 428) {
      console.log("La conexión fue cerrada inesperadamente. Intentando reconectar...");
      reconnectToBot();
    }
  });

  sock.ev.on('messages.upsert', async (msg) => {
    console.log('Nuevo mensaje recibido:', msg);
    // Maneja los mensajes entrantes aquí
  });

  return sock;
}

async function reconnectToBot() {
  // Aquí manejas la lógica de reconexión del bot
  console.log("Reconectando...");
}

export default setupBotSession;