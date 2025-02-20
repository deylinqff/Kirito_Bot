require('../main.js')
const fs = require("fs")
const path = require("path")
const chalk = require("chalk");
const axios = require('axios')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const yts = require('yt-search')
const ytdl = require('ytdl-core')
const fg = require('api-dylux')
const {
    savefrom,
    lyrics,
    lyricsv2,
    youtubedl,
    youtubedlv2
} = require('@bochilteam/scraper')
const {
    smsg,
    fetchBuffer,
    getBuffer,
    buffergif,
    getGroupAdmins,
    formatp,
    tanggal,
    formatDate,
    getTime,
    isUrl,
    sleep,
    clockString,
    runtime,
    fetchJson,
    jsonformat,
    delay,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getFile,
    getRandom,
    msToTime,
    downloadMediaMessage
} = require('../libs/fuctions')
const {
    ytmp4,
    ytmp3,
    ytplay,
    ytplayvid
} = require('../libs/youtube')
const {
    sizeFormatter
} = require('human-readable')
const formatSize = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`
});
let user = global.db.data.users[m.sender]
let limit = 320

async function descarga(m, command, conn, text, command, args, fkontak, from, buffer, getFile, q, includes, lolkeysapi) {
    if (global.db.data.users[m.sender].registered < true) return m.reply(info.registra)
    if (global.db.data.users[m.sender].limit < 1) return m.reply(info.endLimit)
    if (global.db.data.users[m.sender].banned) return


/*if (command === 'play' || command === 'musica') {
    if (!text) return m.reply(`*¿Qué está buscando? 🎶*\nEjemplo: *${prefix + command}* ozuna`);

    const startTime = Date.now();

    conn.fakeReply(
        m.chat,
        `*ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ 🔈.*\n\n> No hagas spam de comandos`,
        '0@s.whatsapp.net',
        '𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐚𝐮𝐝𝐢𝐨 𝐞𝐬𝐩𝐞𝐫𝐚'
    );

    m.react(rwait);

    const yt_play = await search(args.join(' '));
    if (!yt_play || yt_play.length === 0) {
        return m.reply("⚠️ No se encontró ninguna canción.");
    }

    const videoInfo = yt_play[0];
    const texto1 = `*🎵 Canción Encontrada ✅*\n📌 *Título:* ${videoInfo.title}\n🕒 *Publicado:* ${videoInfo.ago}\n⏱️ *Duración:* ${secondString(videoInfo.duration.seconds)}\n👀 *Vistas:* ${MilesNumber(videoInfo.views)}\n✍️ *Autor:* ${videoInfo.author.name}\n🔗 *Link:* ${videoInfo.url}\n\n✨ *Recuerda seguir mi canal, me apoyarías mucho* 🙏: https://whatsapp.com/channel/0029VadxAUkKLaHjPfS1vP36`;

    await conn.sendMessage(m.chat, {
        image: { url: videoInfo.thumbnail },
        caption: texto1
    }, { quoted: m });

    const apiUrl = `https://api.nyxs.pw/dl/yt-direct?url=${encodeURIComponent(videoInfo.url)}`;

    try {
        const response = await axios.get(apiUrl);
        if (response.data.status) {
            const audioUrl = response.data.result.urlAudio;
            const audioCaption = `Listo, aquí está ${videoInfo.title}`;

            await conn.sendMessage(m.chat, {
                document: { url: audioUrl },
                mimetype: 'audio/mpeg',
                fileName: `${videoInfo.title}.mp3`,
                caption: audioCaption,
                thumbnail: videoInfo.thumbnail
            }, { quoted: m });

            const endTime = Date.now();
            const totalTime = ((endTime - startTime) / 1000).toFixed(2);
            m.react(done);
            m.reply(`✅ ¡Audio enviado! Tiempo total de envío: ${totalTime} segundos.`);
        } else {
            throw new Error('No se pudo obtener el audio');
        }
    } catch (e) {
        const fallbackAudioUrl = `https://api.dorratz.com/v2/yt-mp3?url=${encodeURIComponent(videoInfo.url)}`;
        try {
            const audioCaption = `Listo, aquí está ${videoInfo.title}`;

            await conn.sendMessage(m.chat, {
                document: { url: fallbackAudioUrl },
                mimetype: 'audio/mpeg',
                fileName: `${videoInfo.title}.mp3`,
                caption: audioCaption,
                thumbnail: videoInfo.thumbnail
            }, { quoted: m });

            const endTime = Date.now();
            const totalTime = ((endTime - startTime) / 1000).toFixed(2);
            m.react(done);
            m.reply(`✅ ¡Audio enviado! Tiempo total de envio: ${totalTime} segundos.`);
        } catch (error) {
            m.react(error);
            m.reply(`Ocurrió un error inesperado - ${error.message}`);
        }
    }
}*/

if (command == 'play2test' || command == 'videotest') {
if (!text) return m.reply(`*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`) 
const yt_play = await search(args.join(' '));
const ytplay2 = await yts(text);
await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*

*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻Aguarde un momento en lo que envío su video*`, m, null,);
try {
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius.status) return m.react("❌");
const downloadUrl = delius.data.download.url;
const fileSize = await getFileSize(downloadUrl);
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}` }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
}} catch (e1) {
try {    
let qu = args[1] || '360'
let q = qu + 'p'
const yt = await youtubedl(yt_play[0].url).catch(async _ => await youtubedlv2(yt_play[0].url))
const dl_url = await yt.video[q].download()
const ttl = await yt.title
const size = await yt.video[q].fileSizeH
await await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `🔰 𝘼𝙦𝙪𝙞 𝙚𝙨𝙩𝙖 𝙩𝙪 𝙫𝙞𝙙𝙚𝙤 \n🔥 𝙏𝙞𝙩𝙪𝙡𝙤: ${ttl}`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m })
} catch (e2) {
try {    
const downloadUrl = await fetch9Convert(yt_play[0].url); 
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
} catch (e3) {
try {
const downloadUrl = await fetchY2mate(yt_play[0].url);
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
} catch (e4) {
try {
const videoInfo = await fetchInvidious(yt_play[0].url)
const downloadUrl = videoInfo.videoFormats.find(format => format.mimeType === "audio/mp4").url;
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
} catch (e5) {
try {
let searchh = await yts(yt_play[0].url)
let __res = searchh.all.map(v => v).filter(v => v.type == "video")
let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId)
let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' })
conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
} catch (e6) {
try {
let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`);
let dp = await d2.json();
const audiop = await getBuffer(dp.result.media.mp4);
const fileSize = await getFileSize(dp.result.media.mp4);
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: { url: audiop }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}` }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { video: { url: audiop }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
}} catch (e) {    
await m.react('❌');
console.log(e);
}}}}}}}}

/*if (command === 'video' || command === 'play2') {
    if (!text) return m.reply(`*¿Qué video está buscando? 🎥*\nEjemplo: *${prefix + command}* ozuna`);

    const startTime = Date.now();

    conn.fakeReply(
        m.chat,
        `*ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ 🎥.*\n\n> No hagas spam de comandos`,
        '13135550002@s.whatsapp.net',
        '𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐯𝐢𝐝𝐞𝐨 𝐞𝐬𝐩𝐞𝐫𝐚'
    );

    m.react(rwait);

    const yt_play = await search(args.join(' '));
    if (!yt_play || yt_play.length === 0) {
        return m.reply("⚠️ No se encontró ningún video.");
    }

    const texto1 = `*🎬 Video Encontrado ✅*\n📌 *Título:* ${yt_play[0].title}\n🕒 *Publicado:* ${yt_play[0].ago}\n⏱️ *Duración:* ${secondString(yt_play[0].duration.seconds)}\n👀 *Vistas:* ${MilesNumber(yt_play[0].views)}\n✍️ *Autor:* ${yt_play[0].author.name}\n🔗 *Link:* ${yt_play[0].url}\n\n✨ *Recuerda seguir mi canal, me apoyarías mucho* 🙏: https://whatsapp.com/channel/0029VadxAUkKLaHjPfS1vP36`;

    await conn.sendMessage(m.chat, {
        image: { url: yt_play[0].thumbnail },
        caption: texto1
    }, { quoted: m });

    const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytdl?url=${encodeURIComponent(yt_play[0].url)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const videoInfo = data.resultUrl.video.find(v => v.quality === '360p');

        if (!videoInfo) throw new Error('No se encontró video en 360p');

        await conn.sendMessage(m.chat, {
            video: { url: videoInfo.download },
            fileName: `${data.result.title}.mp4`,
            mimetype: 'video/mp4',
            caption: `${lenguaje.descargar.text4}\n🔰 ${lenguaje.descargar.title} ${data.result.title}`
        }, { quoted: m });

        const endTime = Date.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);
        m.react(done);
        m.reply(`✅ ¡Video enviado! Tiempo total de envío: ${totalTime} segundos.`);
    } catch (e) {
        const apiUrlFallback = `https://api.nyxs.pw/dl/yt-direct?url=${encodeURIComponent(yt_play[0].url)}`;
        try {
            const response = await axios.get(apiUrlFallback);
            if (response.data.status) {
                const videoUrl = response.data.result.urlVideo;
                await conn.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    fileName: `${response.data.result.title}.mp4`,
                    mimetype: 'video/mp4',
                    caption: `${lenguaje.descargar.text4}\n🔰 ${lenguaje.descargar.title} ${response.data.result.title}`
                }, { quoted: m });

                const endTime = Date.now();
                const totalTime = ((endTime - startTime) / 1000).toFixed(2);
                m.react(done);
                m.reply(`✅ ¡Video enviado! Tiempo total de envio: ${totalTime} segundos.`);
            } else {
                throw new Error('No se pudo obtener el video de la segunda API');
            }
        } catch (error) {
            m.react(error);
            return m.reply(`Ocurrió un error inesperado - ${error.message}`);
        }
    }
}*/

    if (command === 'bilibili') {
        if (!text) return m.reply(`Por favor proporciona un enlace de Bilibili usando el comando de esta forma: *${prefix + command} <URL del video>*`);

        conn.fakeReply(m.chat, `*ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ 🎥.*\n\n> No hagas spam de comandos`, '0@s.whatsapp.net', '𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐯𝐢𝐝𝐞𝐨 𝐞𝐬𝐩𝐞𝐫𝐚');

        m.react(rwait);

        try {
            const apiUrl = `https://api.ryzendesu.vip/api/downloader/bilibili?url=${encodeURIComponent(text)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.status) throw new Error('Error al obtener el video de la API');

            const title = data.data.title;
            const views = data.data.views;
            const likes = data.data.like;
            const cover = data.data.cover;
            const infoMessage = `🎬 *Título:* ${title}\n👀 *Vistas:* ${views}\n❤️ *Likes:* ${likes}\n📸 *Portada:* ${cover}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: cover
                },
                caption: infoMessage
            }, {
                quoted: m
            });

            const videoUrl = data.data.mediaList.videoList[0].url;
            const fileName = data.data.mediaList.videoList[0].filename;

            await conn.sendMessage(m.chat, {
                video: {
                    url: videoUrl
                },
                fileName: `${fileName}`,
                mimetype: 'video/mp4',
                caption: `🔰 Aquí tienes el video: ${title}`
            }, {
                quoted: m
            });

            m.react(done);
        } catch (error) {
            m.react(error);
            return m.reply(`Ocurrió un error inesperado: ${error.message}`);
        }
    }

    if (command == 'music' || command == 'spotify') {
        if (!text) return m.reply("Por favor, ingresa el nombre de la canción o el enlace de Spotify.");
        try {
            m.react("⏳");

            const res = await fetch(`https://api.nyxs.pw/dl/spotify-direct?title=${text}`);
            const data = await res.json();

            if (!data.status) throw new Error("Error al obtener datos de Spotify.");

            const {
                urlSpotify,
                title,
                artists,
                album,
                thumbnail,
                url,
                releaseDate
            } = data.result;

            let spotifyInfo = `🎶 *Título:* ${title}\n🎤 *Artista(s):* ${artists}\n💽 *Álbum:* ${album}\n📅 *Fecha de lanzamiento:* ${releaseDate}\n\n🔗 *Enlace de Spotify:* ${urlSpotify}`;

            await conn.sendMessage(m.chat, {
                text: spotifyInfo.trim(),
                contextInfo: {
                    forwardingScore: 9999999,
                    isForwarded: false,
                    externalAdReply: {
                        showAdAttribution: true,
                        containsAutoReply: true,
                        renderLargerThumbnail: true,
                        title: title,
                        mediaType: 1,
                        thumbnail: await (await fetch(thumbnail)).buffer(),
                        mediaUrl: urlSpotify,
                        sourceUrl: urlSpotify
                    }
                }
            }, {
                quoted: m
            });

            await conn.sendMessage(m.chat, {
                audio: {
                    url: url
                },
                fileName: `${title}.mp3`,
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            });

            m.react("✅");
        } catch (error) {
            m.react("❌");
            console.error(error);
            return m.reply("Ocurrió un error al procesar tu solicitud.");
        }
    }

    if (command == 'gitclone') {
        if (!args[0]) return m.reply(lenguaje.descargar.text9 + `\n${prefix + command} ${md}`)
        if (!isUrl(args[0]) && !args[0].includes('github.com')) return m.reply(`Link invalido!!`)
        m.react('🕔')
        m.reply(lenguaje.descargar.text10)
        try {
            let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
            let [, user, repo] = args[0].match(regex1) || []
            repo = repo.replace(/.git$/, '')
            let url = `https://api.github.com/repos/${user}/${repo}/zipball`
            let filename = (await fetch(url, {
                method: 'HEAD'
            })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
            conn.sendMessage(m.chat, {
                document: {
                    url: url
                },
                fileName: filename + '.zip',
                mimetype: 'application/zip'
            }, {
                quoted: m,
                ephemeralExpiration: 24 * 60 * 100,
                disappearingMessagesInChat: 24 * 60 * 100
            }).catch((err) => m.reply(info.error))
            db.data.users[m.sender].limit -= 1
            m.reply('1 ' + info.limit)
            m.react(done)
        } catch {
            m.react(error)
            m.reply(info.error)
        }
    }

if (command == 'tiktok' || command == 'tt') {
    if (!text) return m.reply(`${lenguaje.lengua.ejem}\n${prefix + command} https://vm.tiktok.com/ZMjdrFCtg/`);
    if (!isUrl(args[0]) && !args[0].includes('tiktok')) return m.reply(`¡Link inválido!`);
    conn.fakeReply(m.chat, `${lenguaje.lengua.espere}`, '0@s.whatsapp.net', 'No haga spam');

    try {
        const url = args[0];

        const apiUrl = `https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${url}`;
        const apiResponse = await axios.get(apiUrl);
        const { status, results } = apiResponse.data;

        let videoUrl, caption = "No se pudo obtener la información del video.";

        if (status && results) {
            videoUrl = results.nowm;
            caption = `Título: ${results.title}\nAutor: ${results.author}`;
        } else {
            throw new Error('Error al obtener datos de la nueva API');
        }

        if (!videoUrl) {
            const backupApiUrl = `https://api.dorratz.com/v2/tiktok-dl?url=${url}`;
            const backupResponse = await axios.get(backupApiUrl);
            const { data } = backupResponse.data;

            if (data && data.media && data.media.org) {
                videoUrl = data.media.org;
            } else {
                throw new Error('Error al procesar el video en la API de respaldo.');
            }
        }

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: caption
        }, { quoted: m });
    } catch (e) {
        m.reply(info.error);
    }
}

    if (command == 'tik2') {
        if (!text) return m.reply(`${lenguaje.lengua.ejem}\n${prefix + command} https://vm.tiktok.com/ZMjdrFCtg/`)
        if (!isUrl(args[0]) && !args[0].includes('tiktok')) return m.reply(`Link invalido!!`)
        conn.fakeReply(m.chat, `${lenguaje.lengua.espere}`, '0@s.whatsapp.net', 'No haga spam')
        try {
            require('../libs/tiktok').Tiktok(args).then(data => {
                conn.sendMessage(m.chat, {
                    audio: {
                        url: data.audio
                    },
                    mimetype: 'audio/mp4'
                }, {
                    quoted: m,
                    ephemeralExpiration: 24 * 60 * 100,
                    disappearingMessagesInChat: 24 * 60 * 100
                })
            })
            db.data.users[m.sender].limit -= 1
            m.reply('1 ' + info.limit)
        } catch {
            m.reply(info.error)
        }
    }

    if (command == 'tiktokimg' || command == 'ttimg') {
        if (!text) return m.reply(`${lenguaje.lengua.espere}\n${prefix + command} https://vm.tiktok.com/ZMjnPvJuF/`)
        m.react("📥")
        let imagesSent
        if (imagesSent) return;
        imagesSent = true
        try {
            conn.fakeReply(m.chat, `${lenguaje.lengua.espere}`, '0@s.whatsapp.net', 'No haga spam')
            let tioShadow = await ttimg(text);