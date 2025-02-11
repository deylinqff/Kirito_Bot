import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('👑↛ 𝐹𝑜𝑟𝑚𝑎𝑡𝑜 𝑛𝑜 𝑠𝑜𝑝𝑜𝑟𝑡𝑎𝑏𝑙𝑒, 𝑣𝑒𝑟𝑖𝑓𝑖𝑐𝑎 𝑙𝑎 𝑙𝑖𝑠𝑡𝑎 𝑑𝑒 𝑓𝑜𝑟𝑚𝑎𝑡𝑜𝑠 𝑑𝑖𝑠𝑝𝑜𝑛𝑖𝑏𝑙𝑒𝑠_°');
    }

    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return downloadUrl;
      } else {
        throw new Error('⚡↛ 𝐹𝑎𝑙𝑙𝑜 𝑎𝑙 𝑜𝑏𝑡𝑒𝑛𝑒𝑟 𝑙𝑜𝑠 𝑑𝑒𝑡𝑎𝑙𝑙𝑒𝑠 𝑑𝑒𝑙 𝑣𝑖𝑑𝑒𝑜_°');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `✨↛ 𝐼𝑛𝑔𝑟𝑒𝑠𝑎 𝑒𝑙 𝑛𝑜𝑚𝑏𝑟𝑒 𝑑𝑒 𝑙𝑎 𝑚𝑢𝑠𝑖𝑐𝑎 𝑎 𝑑𝑒𝑠𝑐𝑎𝑟𝑔𝑎𝑟_°`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('✖️↛ 𝑁𝑜 𝑠𝑒 𝑒𝑛𝑐𝑜𝑛𝑡𝑟𝑎𝑟𝑜𝑛 𝑟𝑒𝑠𝑢𝑙𝑡𝑎𝑑𝑜𝑠 𝑝𝑎𝑟𝑎 𝑡𝑢 𝑏𝑢𝑠𝑞𝑢𝑒𝑑𝑎_°');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const infoMessage = `🏓 𝑇𝑖𝑡𝑢𝑙𝑜: *${title}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 🚀↛ 𝐷𝑢𝑟𝑎𝑐𝑖𝑜𝑛: *${timestamp}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 👑↛ 𝑉𝑖𝑠𝑡𝑎𝑠: *${vistas}*\n*°.⎯⃘̶⎯̸⎯ܴ⎶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ✨↛ 𝐶𝑎𝑛𝑎𝑙: *${videoInfo.author.name || 'Desconocido'}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 🪄↛ 𝑃𝑢𝑏𝑙𝑖𝑐𝑎𝑑𝑜: *${ago}*\n*°.⎯⃘̶⎯̸⎯ܴ⎶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ⚡↛ 𝐸𝑛𝑙𝑎𝑐𝑒: ${url}`;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: packname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    if (command === 'playdoc' || command === 'ytmp3doc') {
      const downloadUrl = await ddownr.download(url, 'mp3');
      await conn.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName: `${title}.mp3`,
        mimetype: "audio/mpeg"
      }, { quoted: m });

    } else if (command === 'playdoc2' || command === 'ytmp4doc') {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      let downloadPromises = sources.map(source =>
        fetch(source)
          .then(res => {
            if (!res.ok) throw new Error('Error en la respuesta de la API');
            return res.json();
          })
          .then(({ data }) => data?.dl || data?.download?.url)
          .catch(err => {
            console.error('Error al obtener la URL de descarga:', err);
            return null;
          })
      );

      try {
        const downloadUrls = await Promise.all(downloadPromises);
        const validUrl = downloadUrls.find(url => url);

        if (validUrl) {
          await conn.sendMessage(m.chat, {
            document: { url: validUrl },
            fileName: `${title}.mp4`,
            mimetype: 'video/mp4',
            caption: `🌷↛ 𝐴𝑞𝑢𝑖 𝑡𝑖𝑒𝑛𝑒𝑠 ｡^‿^｡`,
            thumbnail: thumb
          }, { quoted: m });
        } else {
          return m.reply(`🌷↛ *𝑁𝑜 𝑠𝑒 𝑝𝑢𝑑𝑜 𝑑𝑒𝑠𝑐𝑎𝑒𝑔𝑎𝑟 𝑒𝑙 𝑣𝑖𝑑𝑒𝑜:* 𝑁𝑜 𝑠𝑒 𝑒𝑛𝑐𝑜𝑛𝑡𝑟𝑜 𝑢𝑛 𝑒𝑛𝑘𝑎𝑐𝑒 𝑑𝑒 𝑑𝑒𝑠𝑐𝑎𝑟𝑔𝑎 𝑣𝑎𝑙𝑖𝑑𝑜_°`);
        }
      } catch (error) {
        console.error('✖️ *𝐸𝑅𝑅𝑂𝑅, 𝑎𝑙 𝑜𝑏𝑡𝑒𝑛𝑒𝑟 𝑙𝑎𝑠 𝑈𝑅𝐿 𝑑𝑒 𝑑𝑒𝑠𝑐𝑎𝑟𝑔𝑎_°:', error);
        return m.reply(`✖️ *𝐸𝑅𝑅𝑂𝑅, 𝑎𝑙 𝑖𝑛𝑡𝑒𝑛𝑡𝑎𝑟 𝑑𝑒𝑠𝑐𝑎𝑒𝑔𝑎𝑟 𝑒𝑙 𝑣𝑖𝑑𝑒𝑜_°:* ${error.message}`);
      }
    } else {
      throw "🌷↛ 𝐶𝑜𝑚𝑎𝑛𝑑𝑜 𝑛𝑜 𝑟𝑒𝑐𝑜𝑛𝑜𝑐𝑖𝑏𝑙𝑒.";
    }
  } catch (error) {
    return m.reply(`✖️ *𝐸𝑅𝑅𝑂𝑅_°:* ${error.message}`);
  }
};

handler.command = handler.help = ['playdoc', 'playdoc2', 'ytmp4doc', 'ytmp3doc'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else {
    return views.toString();
  }
}