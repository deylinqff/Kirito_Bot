import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    let grupos = `*Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con la comunidad.....*

- ${namegrupo}
*👑* ${gp1}

- ${namecomu}
*⚡* ${comunidad1}

*ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ*

⚘ Enlace anulado? entre aquí! 

- ${namechannel}
*👑* ${channel}

- ᬊ᭄𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕࿐ཽ༵
*⚡* ${channel2}

> ${dev}`

    const nuevaImagen = 'https://files.catbox.moe/xr2m6u.jpg';

    await conn.sendFile(m.chat, nuevaImagen, "", grupos, m, null, rcanal);

    await m.react(emojis);
};

handler.help = ['grupos'];
handler.tags = ['info'];
handler.command = ['grupos', 'links', 'groups'];

export default handler;