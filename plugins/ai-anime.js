// Código creado por Deyin
const { default: makeWASocket, DisconnectReason, useSingleFileAuthState } = require('@adiwajshing/baileys');
const fs = require('fs');
const gTTS = require('gtts');

// Configuración del estado del bot
const { state, saveState } = useSingleFileAuthState('./session.json');

// Inicia el bot de WhatsApp
const startBot = () => {
    const sock = makeWASocket({
        auth: state,
    });

    // Escucha mensajes entrantes
    sock.ev.on('messages.upsert', async (msg) => {
        const message = msg.messages[0];

        // Ignorar mensajes que no sean de texto o del bot mismo
        if (!message.message || message.key.fromMe) return;

        const from = message.key.remoteJid; // ID del remitente
        const content = message.message.conversation || message.message.extendedTextMessage?.text || '';

        // Verificar si el mensaje comienza con .anime
        if (content.startsWith('.anime')) {
            const texto = content.slice(6).trim(); // Extraer el texto después de .anime

            if (texto) {
                // Generar el audio
                const audioPath = `./audio_anime.mp3`;
                const gtts = new gTTS(texto, 'es');
                gtts.save(audioPath, async (err) => {
                    if (err) {
                        console.error('Error al generar el audio:', err);
                        return;
                    }

                    // Enviar el audio al usuario
                    await sock.sendMessage(from, {
                        audio: { url: audioPath },
                        mimetype: 'audio/mpeg',
                    });

                    // Eliminar el archivo después de enviarlo
                    fs.unlinkSync(audioPath);
                });
            } else {
                // Responder si no hay texto
                await sock.sendMessage(from, {
                    text: 'Por favor escribe un texto después del comando .anime.',
                });
            }
        }
    });

    // Manejar desconexión
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada, intentando reconectar...', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('¡Bot conectado con éxito!');
        }
    });

    sock.ev.on('creds.update', saveState);
};

startBot();