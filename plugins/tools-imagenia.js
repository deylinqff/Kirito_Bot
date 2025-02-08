// Código Creado Por Niño Piña Wa.me/50557865603
import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {
// Verificamos que el usuario haya ingresado un texto
if (!text) throw '*👑 𝒇𝒂𝒍𝒕𝒂 𝒕𝒆𝒙𝒕𝒐 𝒑𝒂𝒓𝒂 𝒈𝒆𝒏𝒆𝒓𝒂𝒓 𝒊𝒎𝒂𝒈𝒆𝒏*';
// Mostramos un emoji de reloj mientras generamos la imagen
m.react('✨');
await conn.sendMessage(m.chat, {text: '*👑 𝒈𝒆𝒏𝒆𝒓𝒂𝒏𝒅𝒐 𝒊𝒎𝒂𝒈𝒆𝒏*'}, {quoted: m});
try {
// Hacemos la solicitud a la API con el texto proporcionado
const response = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);
// Verificamos si la respuesta fue exitosa
if (!response.ok) throw new Error('Network response was not ok');
// Obtenemos el buffer de la imagen
const buffer = await response.buffer();
// Mostramos un emoji de éxito
m.react('🪄');
// Enviamos la imagen generada al chat
await conn.sendMessage(m.chat, {image: buffer}, {quoted: m});
} catch (error) {
console.error(error);
throw `*⚠️error *`;
}
}
// Definimos las etiquetas y comandos para el handler
handler.tags = ['tools'];
handler.help = ['genearimg'];
handler.command = ['genearimg', 'imgg'];
// Exportamos el handler
export default handler;