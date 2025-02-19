import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const formatAudio = ["mp3", "m4a", "webm", "acc", "flac", "opus", "ogg", "wav"];
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error("⚠ Formato no soportado, elige uno de la lista disponible.");
    }

    const apiURL = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

    try {
      const response = await axios.get(apiURL, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });

      if (response.data?.success) {
        return await ddownr.cekProgress(response.data.id);
      } else {
        throw new Error("⛔ No se pudo obtener los detalles del video.");
      }
    } catch (error) {
      console.error("❌ Error en ddownr:", error);
      throw error;
    }
  },

  cekProgress: async (id) => {
    const progressURL = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

    try {
      while (true) {
        const response = await axios.get(progressURL, {
          headers: { "User-Agent": "Mozilla/5.0" },
        });

        if (response.data?.success && response.data.progress === 1000) {
          return response.data.download_url;
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error("❌ Error en cekProgress:", error);
      throw error;
    }
  },
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, "⚔️ *Kirito-Bot* | Ingresa el nombre de la canción que deseas buscar.", m);
    }

    const search = await yts(text);
    if (!search.all.length) {
      return m.reply("⚠ No se encontraron resultados para tu búsqueda.");
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const thumb = (await conn.getFile(thumbnail))?.data;

    const infoMessage = `🖤 *Kirito-Bot - Descargas* 🖤\n\n` +
      `🎶 *Título:* ${title}\n` +
      `⏳ *Duración:* ${timestamp}\n` +
      `👁 *Vistas:* ${vistas}\n` +
      `📺 *Canal:* ${videoInfo.author.name || "Desconocido"}\n` +
      `📅 *Publicado:* ${ago}\n` +
      `🔗 *Enlace:* ${url}`;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: "Kirito-Bot",
          body: "Tu asistente en el mundo virtual",
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true
        }
      }
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    if (command === "playdoc" || command === "ytmp3doc") {
      const downloadUrl = await ddownr.download(url, "mp3");

      if (!downloadUrl) {
        return m.reply("⛔ No se pudo obtener el enlace de descarga.");
      }

      await conn.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName: `${title}.mp3`,
        mimetype: "audio/mpeg"
      }, { quoted: m });

    } else if (command === "playdoc2" || command === "ytmp4doc") {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`,
        `https://yt-api.flx.codes/api/ytmp4?url=${url}` // Nueva API de respaldo
      ];

      let success = false;

      for (let source of sources) {
        try {
          const res = await fetch(source);
          const data = await res.json();
          let downloadUrl = data?.dl || data?.download?.url || data?.link;

          if (downloadUrl) {
            success = true;

            await conn.sendMessage(m.chat, {
              document: { url: downloadUrl },
              fileName: `${title}.mp4`,
              mimetype: "video/mp4",
              caption: "⚔ Aquí tienes tu video descargado por *Kirito-Bot* ⚔",
              thumbnail: thumb
            }, { quoted: m });

            break;
          }
        } catch (e) {
          console.error(`⚠ Error con la API ${source}:`, e.message);
        }
      }

      if (!success) {
        return m.reply("⛔ *Error:* No se encontró un enlace de descarga válido.");
      }
    } else {
      throw "❌ Comando no reconocido.";
    }
  } catch (error) {
    return m.reply(`⚠ Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ["playdoc", "playdoc2", "ytmp4doc", "ytmp3doc"];
handler.tags = ["downloader"];

export default handler;

function formatViews(views) {
  return views >= 1000 ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")" : views.toString();
}