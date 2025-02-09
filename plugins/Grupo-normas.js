let handler = async (m, { conn, command, usedPrefix }) => {
    let staff = `
*Normas de Uso de Kirito Bot*

1. Respeto y buen uso: No se permite el uso del bot para insultos, acoso, amenazas o cualquier otro comportamiento ofensivo.

2. No spam: Evita el uso excesivo de comandos en un corto período de tiempo para no sobrecargar el bot.

3. Prohibido contenido ilegal: No uses el bot para compartir contenido ilegal, ofensivo o que infrinja derechos de autor.

4. Uso responsable: Kirito Bot es una herramienta de asistencia y entretenimiento. No es un bot de soporte oficial ni sustituye fuentes confiables de información.

5. No manipulación del bot: No intentes hackear, explotar vulnerabilidades o modificar el bot para fines no autorizados.

6. Restricciones de uso: Dependiendo del grupo o usuario, el bot puede limitar ciertas funciones si se detecta un mal uso.

7. Cierre de acceso: Si se incumplen las normas, el bot puede bloquear el acceso a ciertos usuarios sin previo aviso.

---

*Política de Privacidad de Kirito Bot*

1. Recopilación de Datos
Kirito Bot puede almacenar información básica como números de teléfono, mensajes enviados al bot y comandos utilizados, con el único propósito de mejorar su funcionamiento.
No se comparten datos con terceros ni se venden a ninguna entidad.

2. Uso de la Información
Los datos recopilados solo se utilizan para mejorar la experiencia del usuario y garantizar un uso adecuado del bot.
En algunos casos, se pueden utilizar para detectar abusos o violaciones de las normas.

3. Seguridad de los Datos
Se toman medidas para proteger la información de los usuarios, pero no se puede garantizar una seguridad absoluta debido a la naturaleza de Internet.
No se almacenan datos bancarios, contraseñas ni información altamente sensible.

4. Eliminación de Datos
Los usuarios pueden solicitar la eliminación de su información contactando al administrador del bot.
Algunos datos pueden ser eliminados automáticamente después de un tiempo determinado.

5. Actualización de la Política
Esta política puede actualizarse en cualquier momento. Se notificará a los usuarios si hay cambios significativos.
    `;
    
    // Verifica si tienes la imagen correcta de 'icons' y 'icono' disponibles
    let icons = 'ruta/a/tu/imagen/yaemori.jpg';  // Reemplaza con la ruta correcta de la imagen
    let icono = 'ruta/a/tu/icono.jpg';  // Reemplaza con la ruta correcta del icono
    let redes = 'https://enlace/a/redes';  // Reemplaza con el enlace a las redes sociales del bot
    let fkontak = { id: m.sender };  // Aquí agregamos el id del remitente para la respuesta

    await conn.sendFile(m.chat, icons, 'yaemori.jpg', staff.trim(), fkontak, true, {
        contextInfo: {
            'forwardingScore': 200,
            'isForwarded': false,
            externalAdReply: {
                showAdAttribution: true,
                renderLargerThumbnail: false,
                title: `🥷 Developers 👑`,
                body: `✨ Staff Oficial`,
                mediaType: 1,
                sourceUrl: redes,
                thumbnailUrl: icono
            }
        }
    }, { mentions: [m.sender] });

    m.react('👍');
}

handler.help = ['normas']
handler.command = ['norma', 'política']
handler.register = true
handler.tags = ['main']