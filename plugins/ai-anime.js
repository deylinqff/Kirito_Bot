import axios from 'axios';
import fetch from 'node-fetch';
import { exec } from 'child_process';
import fs from 'fs';
import { promisify } from 'util';
const execAsync = promisify(exec);

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/');
  const username = `${conn.getName(m.sender)}`;
  const basePrompt = `Tu nombre es ${botname} y parece haber sido creada por Deylin. Tu versión actual es 2.1.5, Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, y te encanta aprender. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`;

  // Comando para generar audio estilo anime
  if (command === 'anime') {
    if (!text) {
      return conn.reply(m.chat, `🚀 Escribe un texto después del comando .anime para generar un audio estilo anime.`, m);
    }
    await m.react(rwait);

    try {
      const audioPath = `./temp_audio_${Date.now()}.mp3`;
      await generarAudioAnime(text, audioPath);

      // Leer el archivo generado para enviarlo correctamente
      const audioFile = fs.createReadStream(audioPath);
      await conn.sendMessage(m.chat, { audio: audioFile, mimetype: 'audio/mpeg' }, { quoted: m });

      // Limpiar archivo temporal después de enviarlo
      audioFile.on('end', () => {
        fs.unlinkSync(audioPath);
      });

      await m.react(done);
    } catch (error) {
      console.error('⚠️ Error al generar el audio:', error);
      await m.react(error);
      return conn.reply(m.chat, '✘ Kirito-Bot no pudo generar el audio.', m);
    }
    return;
  }

  // Comando para generar audio con efectos usando play.ht
  if (command === 'tts2') {
    const [efecto, ...textoArray] = text.split(" ");
    const texto = textoArray.join("");

    if (!efecto) {
      let voiceList = await getVoiceList();
      let responseText = `*〘⌬〙 No haz ingresado un efecto, por favor ingresa un efecto de voz.*\n\n*✎ Elige uno de los siguientes efectos:*\n`;

      for (let i = 0, count = 0; count < 100 && i < voiceList.resultado.length; i++) {
        const entry = voiceList.resultado[i];
        if (entry.ID.length <= 20) {
          responseText += `*◉ ${usedPrefix + command} ${entry.ID} tu-texto-aquí*\n`;
          count++;
        }
      }

      return conn.sendMessage(m.chat, { text: responseText.trim() }, { quoted: m });
    }

    let efectoValido = false;
    let voiceList = await getVoiceList();
    for (const entry of voiceList.resultado) {
      if (entry.ID === efecto) {
        efectoValido = true;
        break;
      }
    }

    if (!efectoValido) return conn.sendMessage(m.chat, { text: `*☒ El efecto proporcionado no existe en la lista, utiliza ${usedPrefix + command} para conocer la lista de efectos.*` }, { quoted: m });

    if (!texto) return conn.sendMessage(m.chat, {text: `*✎ Ingresa el texto que quieras convertir a audio.*\n\n*✎ Ejemplo:*\n*◉ ${usedPrefix + command} ${efecto} Hola, este es un ejemplo de uso del comando.*`}, {quoted: m});

    let masivo = await makeTTSRequest(texto, efecto);
    conn.sendMessage(m.chat, {audio: {url: masivo.resultado}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
    return;
  }

  // Código para manejar imágenes y otros comandos...
  if (isQuotedImage) {
    const q = m.quoted;
    const img = await q.download?.();
    if (!img) {
      console.error('⚠️ Error: No image buffer available');
      return conn.reply(m.chat, '✘ Kirito-Bot no pudo descargar la imagen.', m, fake);
    }
    const content = '👁️‍🗨️ ¿Qué se observa en la imagen?';
    try {
      const imageAnalysis = await fetchImageBuffer(content, img);
      const query = '⚡ Descríbeme la imagen y detalla por qué actúan así. También dime quién eres';
      const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`;
      const description = await luminsesi(query, username, prompt);
      await conn.reply(m.chat, description, m, fake);
    } catch {
      await m.react(error);
      await conn.reply(m.chat, '✘ Kirito-Bot no pudo analizar la imagen.', m, fake);
    }
  } else {
    if (!text) {
      return conn.reply(m.chat, `🚀 Ingrese una petición para que Kirito-Bot lo responda.`, m);
    }
    await m.react(rwait);
    try {
      const { key } = await conn.sendMessage(m.chat, { text: `💠 Kirito-Bot está procesando tu petición, espera unos segundos.` }, { quoted: m });
      const query = text;
      const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
      const response = await luminsesi(query, username, prompt);
      await conn.sendMessage(m.chat, { text: response, edit: key });
      await m.react(done);
    } catch {
      await m.react(error);
      await conn.reply(m.chat, '✘ Kirito-Bot no puede responder a esa pregunta.', m, fake);
    }
  }
};

handler.help = ['anime', 'chatgpt', 'anime'];
handler.tags = ['ai', 'audio'];
handler.register = true;
handler.command = ['anime', 'chatgpt', 'anime', 'tts2'];

export default handler;

// Función para generar audios estilo anime
async function generarAudioAnime(texto, audioPath) {
  const comando = `gtts-cli "${texto}" --lang es --output "${audioPath}"`;
  await execAsync(comando);
}

// Función para enviar una imagen y obtener el análisis
async function fetchImageBuffer(content, imageBuffer) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: content,
      imageBuffer: imageBuffer,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
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
      webSearchMode: false,
    });
    return response.data.result;
  } catch (error) {
    console.error('⚠️ Error al obtener:', error);
    throw error;
  }
}

async function getVoiceList() {
  const url = 'https://play.ht/api/v2/voices';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      AUTHORIZATION: `Bearer ${secretKey}`,
      'X-USER-ID': userId
    }
  };
  try {
    const response = await fetch(url, options);
    const responseData = await response.json(); 
    const uniqueData = responseData.reduce((acc, current) => {
      if (!acc.some(item => item.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);
    const simplifiedList = uniqueData.map(entry => ({
      ID: entry.id,
      name: entry.name,
      lenguaje: entry.language  
    }));
    return { resultado: simplifiedList ? simplifiedList : '⚠️ Error, no se obtuvo respuesta de la API.' };
  } catch (error) {
    console.error('Error:', error);
    return { resultado: '⚠️