function handler(m) {
let name = conn.getName(`${suittag}@s.whatsapp.net`)
let ownerN = `${suittag}`
conn.sendContact(m.chat, [[`${ownerN}@s.whatsapp.net`, `${name}`]], m, {
 contextInfo: { 
 }
   }
     },
       {
         quoted: m
           }
             );

}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler