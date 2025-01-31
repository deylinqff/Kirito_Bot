const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

var handler = async (m, { conn }) => {
    let name2 = m.pushName || "Alguien";
    let name = m.mentionedJid?.[0] ? "@" + m.mentionedJid[0].split("@")[0] : null;
    let who = m.quoted ? "@" + m.quoted.sender.split("@")[0] : null;

    let str;
    if (m.mentionedJid?.length > 0) {
        str = `\`${name2}\` *insulto a* \`${name}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *insulto a* \`${who}\`.`;
    } else {
        str = `\`${name2}\` *se insulto así mismo.*`.trim();
    }

    let mensajeFinal = 
                      `${str}\n\n` + *┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n` +
                      `❥ *"${pickRandom(global.insultos)}"*\n\n` +
                      `*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`;

    conn.reply(m.chat, mensajeFinal, m);
}

handler.help = ['insulto'];
handler.tags = ['fun'];
handler.command = ['insulto'];
handler.fail = null;
handler.exp = 0;
handler.group = true;
handler.register = true;

export default handler;

let hasil = Math.floor(Math.random() * 5000);

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

global.insultos = [
    "Eres tan inútil como un lápiz sin punta.",
    "Si la estupidez doliera, estarías en cuidados intensivos.",
    "Tienes menos cerebro que un pez dorado con amnesia.",
    "Eres más lento que una tortuga con muletas.",
    "Pareces una calculadora sin pilas, no sirves para nada.",
    "Tu inteligencia es como un WiFi público: débil e inestable.",
    "Eres el error 404 de la lógica.",
    "Si fueras un chiste, ni los grillos se reirían.",
    "No eres tonto, solo que la inteligencia decidió no molestarte.",
    "Eres la prueba de que la evolución también comete errores.",
    "Tienes la misma utilidad que un paracaídas con agujeros.",
    "Si la ignorancia fuera deporte, serías campeón mundial.",
    "Tu lógica tiene más agujeros que un queso suizo.",
    "Tienes menos futuro que un Nokia con Android.",
    "Eres tan brillante como una bombilla fundida.",
    "Eres más molesto que un captcha con jeroglíficos.",
    "Si fueras más lento, caminarías hacia atrás.",
    "Eres la razón por la que las señales de advertencia existen.",
    "Si te tiras al mar, hasta los peces te devuelven.",
    "Tu cerebro es como un Windows sin actualizaciones, obsoleto."
];