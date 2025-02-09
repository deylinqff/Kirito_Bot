export async function before(m, { conn, groupMetadata }) {
    // Verificar si es un mensaje dentro de un grupo y si tiene un tipo de stub válido
    if (!m.messageStubType || !m.isGroup) return true;

    // Definir la lista de violaciones (insultos al bot)
    const violationList = [
        "maldito bot",
        "bot no sirve para nada",
        "bot de mierda",
        "bot inútil",
        "fuck bot",
        "idiota bot",
        "bot tonto",
        "no me gusta el bot",
        "bot estúpido",
        "bot de mierda"
    ];

    // Obtener el ID del usuario que envió el mensaje
    let userId = m.messageStubParameters[0];
    
    // Mensaje de violación de políticas
    let violationMessage = `¡Atención! El usuario @${userId.split`@`[0]} ha violado las políticas del grupo al insultar al bot.`;

    // Comprobar si el mensaje contiene algún término prohibido
    const messageContent = m.text ? m.text.toLowerCase() : "";

    // Si el mensaje contiene una violación, enviamos una notificación
    if (violationList.some(violation => messageContent.includes(violation))) {
        try {
            // Enviar mensaje al número +50488198573 con el detalle del incumplimiento
            await conn.sendMessage(
                '+50488198573@c.us',
                violationMessage
            );
        } catch (error) {
            console.error('Error al enviar mensaje de violación de políticas:', error);
        }

        // Aumentar un contador de violaciones del usuario
        let userViolations = global.db.data.users[userId]?.violations || 0;
        userViolations++;
        global.db.data.users[userId] = { ...global.db.data.users[userId], violations: userViolations };

        // Si el usuario excede el límite de violaciones, expulsarlo
        const violationLimit = 3;
        if (userViolations >= violationLimit) {
            try {
                // Expulsar al usuario
                await conn.groupRemove(groupMetadata.id, [userId]);
                await conn.sendMessage(
                    m.chat,
                    `El usuario @${userId.split`@`[0]} ha sido expulsado por violar las políticas del grupo repetidamente.`,
                    { mentions: [userId] }
                );
            } catch (error) {
                console.error('Error al expulsar al usuario:', error);
            }
        }
    }

    // Si se detecta la salida del grupo o expulsión de un usuario, notificarlo
    if (m.messageStubType === 28 || m.messageStubType === 32) {
        let leaveMessage = `El usuario @${userId.split`@`[0]} ha abandonado el grupo o ha sido expulsado.`;
        try {
            await conn.sendMessage(m.chat, leaveMessage, { mentions: [userId] });
        } catch (error) {
            console.error('Error al enviar mensaje de salida/expulsión:', error);
        }
    }

    // Mensaje adicional cuando un usuario entra al grupo
    if (m.messageStubType === 27) {
        let welcomeMessage = `¡Bienvenido al grupo, @${userId.split`@`[0]}! Ten en cuenta que las políticas del grupo deben ser respetadas.`;
        try {
            await conn.sendMessage(m.chat, welcomeMessage, { mentions: [userId] });
        } catch (error) {
            console.error('Error al enviar mensaje de bienvenida:', error);
        }
    }
}

/*
    Explicación de las funcionalidades:

    1. **Lista de violaciones**: Se define una lista de palabras y frases que se consideran insultos hacia el bot. Estas violaciones incluyen comentarios como "maldito bot", "bot estúpido", "bot inútil", etc.
    
    2. **Detección de violaciones**: El bot verifica si el contenido del mensaje contiene alguna de las violaciones predefinidas de la lista. Si el mensaje incluye alguna de estas frases, se activa una notificación.

    3. **Notificación de violación**: Si se detecta una violación, el bot envía un mensaje al número **+50488198573** con la información sobre la violación.

    4. **Contador de violaciones**: El bot mantiene un contador de violaciones por usuario. Si un usuario excede un límite de 3 violaciones (esto es configurable), el bot expulsa al usuario del grupo.

    5. **Manejo de salida o expulsión**: Cuando un usuario sale o es expulsado, el bot envía una notificación al grupo informando sobre esta acción.

    6. **Mensaje de bienvenida**: Cuando un usuario entra al grupo, el bot envía un mensaje de bienvenida, recordando las políticas del grupo.

    7. **Manejo de errores**: Se incluyen bloques `try-catch` para manejar errores en las operaciones, como el envío de mensajes o la expulsión de usuarios.

    8. **Flexibilidad**: Puedes agregar o modificar las violaciones en la lista `violationList` según sea necesario. También puedes ajustar el límite de violaciones que el bot permite antes de expulsar a un usuario.

*/