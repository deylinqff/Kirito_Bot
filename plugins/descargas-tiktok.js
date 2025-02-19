import fetch from "node-fetch";

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, "⚔️ *Kirito-Bot* | Por favor, ingresa un enlace de TikTok.", m);
  }

  try {
    await conn.reply(m.chat, "⏳ Procesando tu solicitud, espera un momento...", m);

    const tiktokData = await tiktokdl(args[0]);

    if (!tiktokData?.data?.play) {
      return conn.reply(m.chat, "❌ Error: No se pudo obtener el video.", m);
    }

    const videoURL = tiktokData.data.play;

    await conn.sendFile(m.chat, videoURL, "tiktok.mp4", "🎥 Aquí tienes tu video descargado por *Kirito-Bot* ⚔", m);
  } catch (error) {
    return conn.reply(m.chat, `⚠ Ocurrió un error: ${error.message}`, m);
  }
};

handler.help = ["tiktok"].map(v => v + " <link>");
handler.tags = ["descargas"];
handler.command = ["tiktok", "tt"];
handler.register = true;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
  let apiURL = `https://www.tikwm.com/api/?url=${url}&hd=1`;
  let response = await fetch(apiURL);
  return await response.json();
}