export async function kiritoJadiBot(options) {
  let { pathKiritoJadiBot, m, conn, args, usedPrefix, command } = options;
  const mcode = args[0] && /(--code|code)/.test(args[0].trim()) || args[1] && /(--code|code)/.test(args[1].trim());
  
  // Función para generar un código de 6 dígitos
  function generarCodigo() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const pathCreds = path.join(pathKiritoJadiBot, "creds.json");
  if (!fs.existsSync(pathKiritoJadiBot)) {
    fs.mkdirSync(pathKiritoJadiBot, { recursive: true });
  }

  try {
    if (args[0] && args[0] !== undefined) {
      fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t'));
    }
  } catch {
    conn.reply(m.chat, `Usa correctamente el comando » ${usedPrefix + command} code`, m);
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
      let secret = generarCodigo(); // Generar código de 6 dígitos
      await conn.sendMessage(m.chat, { text: "*☆𝗞𝗜𝗥𝗜𝗧𝗢 - 𝗕𝗢𝗧☆*\n\n✐ Usa este código para ser *Sub-Bot* Temporal." }, { quoted: m });
      await m.reply(secret.toString()); // Enviar código generado
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