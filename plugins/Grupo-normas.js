const normas = `
┏━━━━━━━━━━━━━━━┓
┃  📜 *NORMAS DE USO* 📜  
┗━━━━━━━━━━━━━━━┛

🔹 *1. Respeto y Buen Uso:*  
Evita insultos, acoso o cualquier actitud ofensiva hacia otros usuarios.  

🔹 *2. No al Spam:*  
No abuses de los comandos en poco tiempo para evitar saturar el bot.  

🔹 *3. Contenido Permitido:*  
No compartas información ilegal, ofensiva o con derechos de autor.  

🔹 *4. Uso Responsable:*  
Kirito Bot es una herramienta de asistencia y entretenimiento, no un soporte oficial.  

🔹 *5. Seguridad y Ética:*  
No intentes explotar, hackear o modificar el bot sin autorización.  

🔹 *6. Restricciones de Uso:*  
El bot puede limitar funciones si detecta abusos.  

🔹 *7. Cierre de Acceso:*  
El incumplimiento de las normas puede llevar a bloqueos sin previo aviso.  

🔹 *📌 Nota:*  
El uso del bot implica la aceptación de estas normas.
`;

const politica = `
┏━━━━━━━━━━━━━━━┓
┃  🔒 *POLÍTICA DE PRIVACIDAD* 🔒  
┗━━━━━━━━━━━━━━━┛

📌 *1. Recopilación de Datos:*  
El bot almacena información básica (número, comandos usados) solo para mejorar su funcionamiento.  

📌 *2. Uso de la Información:*  
Los datos se utilizan exclusivamente para optimizar la experiencia del usuario y detectar abusos.  

📌 *3. Protección de Datos:*  
Se aplican medidas de seguridad, pero la protección absoluta no está garantizada en Internet.  

📌 *4. Eliminación de Datos:*  
Puedes solicitar la eliminación de tu información contactando al administrador.  

📌 *5. Cambios en la Política:*  
Esta política puede actualizarse en cualquier momento. Se notificará si hay cambios importantes.  

🔹 *📌 Nota:*  
Al usar Kirito Bot, aceptas estas condiciones.
`;

    const imagenesURL = 'https://files.catbox.moe/hyrmn9.jpg' 

export async function handler(m, { command }) {
    if (command === 'norma') {
        await m.reply(normas);
    } else if (command === 'política') {
        await m.reply(politica);
    }
}

handler.help = ['norma', 'política'];
handler.tags = ['grupo'];
handler.command = ['norma', 'política'];

export default handler;