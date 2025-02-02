export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) {
    return;
  }

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  const validCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
     if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
        return true;
      }
    }
    return false;
  };

  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];
    if (chat.isBanned) return;
    if (!user.commands) {
      user.commands = 0;
    }
    user.commands += 1;
   // await conn.sendPresenceUpdate('composing', m.chat);
  } else {
   const comando = m.text.trim().split(' ')[0];
   await m.reply(`〘✰〙 𝑬𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 『*${comando}*』 𝒏𝒐 𝒆𝒙𝒊𝒔𝒕𝒆.\n𝑷𝒂𝒓𝒂 𝒗𝒆𝒓 𝒍𝒂 𝒍𝒊𝒔𝒕𝒂 𝒅𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒖𝒔𝒂:\n✎ *#menu*`);
  }
}