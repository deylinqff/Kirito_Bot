const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

// Contador de violaciones por usuario
let violationCount = {};  
let violationDetails = {};  // Detalles de las violaciones

// Listado de incumplimientos (puedes agregar más reglas aquí)
const violationsList = [
    { keyword: "violación de políticas", message: "Viola las políticas del grupo." },
    { keyword: "spam", message: "Envió contenido de spam." },
    { keyword: "enlace malicioso", message: "Compartió un enlace malicioso." },
    { keyword: "lenguaje ofensivo", message: "Usó lenguaje ofensivo." }
];

// Inicia la conexión del cliente de WhatsApp
client.on('message', async (message) => {
    // El número de teléfono del usuario que envió el mensaje
    const user = message.from;  
    // ID del grupo donde se envió el mensaje
    const group = message.from.split('-')[0];  

    // Revisamos las violaciones según las reglas definidas
    let violationDetected = false;
    let violationType = '';

    // Recorremos las reglas de violación y verificamos si el mensaje contiene alguna de ellas
    for (let i = 0; i < violationsList.length; i++) {
        if (message.body.toLowerCase().includes(violationsList[i].keyword.toLowerCase())) {
            violationDetected = true;
            violationType = violationsList[i].message;
            break; // Si se detecta una violación, no es necesario revisar más reglas
        }
    }

    if (violationDetected) {
        // Si el usuario no tiene un contador de violaciones, lo inicializamos en 0
        if (!violationCount[user]) {
            violationCount[user] = 0;
            violationDetails[user] = [];  // Inicializamos la lista de violaciones
        }
        
        // Aumentamos el contador de violaciones
        violationCount[user]++;
        violationDetails[user].push(violationType);  // Guardamos el detalle de la violación

        // Enviar mensaje al número de contacto indicado (en este caso el número +50488198573)
        if (violationCount[user] <= 10) {
            await client.sendMessage(
                '+50488198573@c.us', 
                `El usuario ${user} ha violado las políticas del grupo: ${violationType}. Violation count: ${violationCount[user]}`
            );
        }

        // Si el número de violaciones alcanza o excede 10, se elimina al usuario del grupo y se hace salir al bot
        if (violationCount[user] >= 10) {
            try {
                const groupChat = await client.getChatById(group); // Obtener los detalles del grupo
                await groupChat.removeParticipants([user]);  // Eliminar al usuario del grupo
                await client.sendMessage(group, `El usuario ${user} ha sido removido por violar las políticas del grupo más de 10 veces.`);
                await client.leaveGroup(group);  // El bot sale del grupo
            } catch (error) {
                console.error("Error al intentar remover al usuario o salir del grupo:", error);
            }
        }
    }
});

// Inicialización del cliente de WhatsApp Web
client.initialize().catch((error) => {
    console.error("Error al inicializar el cliente de WhatsApp Web:", error);
});