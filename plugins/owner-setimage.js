import Jimp from 'jimp';

let handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, `⚡ Por favor, responde a una imagen para cambiar la foto de perfil.`, m, rcanal);

  try {
    const media = await m.quoted.download();
    if (!media) return conn.reply(m.chat, `⚡ No se pudo obtener la imagen.`, m, rcanal);

    const image = await Jimp.read(media);
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    await conn.updateProfilePicture(conn.user.jid, buffer);
    return conn.reply(m.chat, '👑 Foto de perfil cambiada con éxito.', m);
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `⚠️ Ocurrió un error al intentar cambiar la foto de perfil.`, m);
  }
};

handler.help = ['setimage'];
handler.tags = ['owner'];
handler.command = ['setpfp', 'setimage'];
handler.rowner = true;

export default handler;