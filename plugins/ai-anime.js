import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/');
  const username = `${conn.getName(m.sender)}`;
  const basePrompt = `Tu nombre es Tecno-bot y parece haber sido creado por Deyin. Tú usas el idioma Español, te gusta ser divertido, te encanta aprender y sobre todo las explociones. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`;

  if (isQuotedImage) {
    const q = m.quoted;
    const img = await q.download?.();

    if (!img) {
      console.error('💛 Error: No image buffer available');
      return conn.reply(m.chat, '💛 Error: No se pudo descargar la imagen.', m, fake);
    }

    const content = '💛 ¿Qué se observa en la imagen?';

    try {
      const imageAnalysis = await fetchImageBuffer(content, img);
      const query = '😊 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres';
      const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`;
      const description = await luminsesi(query, username, prompt);
      await conn.reply(m.chat, description, m);
    } catch (error) {
      console.error('💛 Error al analizar la imagen:', error);
      await conn.reply(m.chat, '💛 Error al analizar la imagen.', m);
    }
  } else {
    if (!text) {
      return conn.reply(m.chat, `💛 *Ingrese su petición*\n💛 *Ejemplo de uso:* ${usedPrefix + command} Como hacer un avión de papel`, m, rcanal);
    }

    await m.react('💬');

    try {
      const query = text;
      const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
      const response = await luminsesi(query, username, prompt);

      const { Client, LocalAuth } = require('whatsapp-web.js');

// Crea un nuevo cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
});

// Se ejecuta cuando el cliente está listo
client.on('ready', () => {
    console.log('¡El bot está listo!');
});

// Envía un mensaje con botones interactivos
client.on('message', async message => {
    if (message.body.toLowerCase() === 'boletos') {
        // Mensaje con botones interactivos
        const buttons = [
            {
                buttonId: 'buy_ticket_1',
                buttonText: { displayText: 'Comprar Boleto 1' },
                type: 1
            },
            {
                buttonId: 'buy_ticket_2',
                buttonText: { displayText: 'Comprar Boleto 2' },
                type: 1
            }
        ];

        const templateMessage = {
            to: message.from,
            type: 'buttons',
            text: '¡Selecciona el boleto que deseas comprar!',
            footer: 'Bot de Boletos Interactivos',
            buttons: buttons,
        };

        client.sendMessage(message.from, templateMessage);
    }
});

// Responde cuando un botón es presionado
client.on('message', async (message) => {
    if (message.body.startsWith('buy_ticket')) {
        const selectedTicket = message.body.split('_')[2]; // Obtiene el número del boleto seleccionado
        client.sendMessage(message.from, `¡Has seleccionado el Boleto ${selectedTicket}!`);
    }
});

// Inicia el cliente
client.initialize();

      // Enviar la respuesta de la IA y los botones interactivos
      await conn.reply(m.chat, response, m);
      await conn.sendMessage(m.chat, buttons);
    } catch (error) {
      console.error('💛 Error al obtener la respuesta:', error);
      await conn.reply(m.chat, 'Error: intenta más tarde.', m);
    }
  }
};

handler.help = ['chatgpt <texto>', 'anime <texto>'];
handler.tags = ['tools'];
handler.register = true;
handler.command = ['ia', 'chatgpt', 'anime', 'chat', 'gpt'];

export default handler;

// Función para enviar una imagen y obtener el análisis
async function fetchImageBuffer(content, imageBuffer) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: content,
      imageBuffer: imageBuffer 
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post("https://Luminai.my.id", {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false
    });
    return response.data.result;
  } catch (error) {
    console.error('💛 Error al obtener:', error);
    throw error;
  }
}